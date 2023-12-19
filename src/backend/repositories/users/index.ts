import { AppDataSource } from "../../db/index";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";

const UserEntity = AppDataSource.getRepository(User);

export const userRepository = {
  signUp: (user: User) => {
    const { username, password, email } = user;
    if (!username || !password || !email) {
      throw new Error(`username or password should be provided`);
    }
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const newUser = UserEntity.create({
        username,
        password: hashedPassword,
        email,
      });
      return UserEntity.save(newUser);
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
