import { User } from "../../../types";
import { AppDataSource } from "../../db/index";
import { User as UserEntityType } from "../../entities/user.entity";
import bcrypt from "bcrypt";

const UserEntity = AppDataSource.getRepository(UserEntityType);

export const userRepository = {
  signUp: (user: User) => {
    const { username, password, email } = user;
    if (!username || !password || !email) {
      throw new Error(`username or password should be provided`);
    }
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      return UserEntity.insert({ username, password: hashedPassword, email });
    } catch (err) {
      throw new Error(`error occurred while sending SELECT schema: ${err}`);
    }
  },
  getUserByEmail: (email: string) => {
    if (!email) {
      throw new Error(`username or password should be provided`);
    }
    try {
      return UserEntity.findOneBy({ email });
    } catch (err) {
      throw new Error(`error occurred while sending SELECT schema: ${err}`);
    }
  },
};
