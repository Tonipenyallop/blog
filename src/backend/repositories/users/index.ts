import { AppDataSource } from "../../db/index";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";

const UserEntity = AppDataSource.getRepository(User);

export const userRepository = {
  createUser: async (user: User) => {
    try {
      const { username, password, email } = user;
      if (!username || !password || !email) {
        throw new Error(`username or password should be provided`);
      }

      const userAlreadyExist = await userRepository.getUserByEmail(email);
      if (userAlreadyExist) {
        throw new Error(`user already exists`);
      }

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = UserEntity.create({
        username,
        password: hashedPassword,
        email,
      });

      return UserEntity.save(newUser);
    } catch (err) {
      throw new Error(`error occurred while creating user: ${err}`);
    }
  },
  getUserByEmail: (email: string) => {
    if (!email) {
      throw new Error(`username or password should be provided`);
    }
    try {
      return UserEntity.findOneBy({ email });
    } catch (err) {
      throw new Error(`error occurred while getting user by email: ${err}`);
    }
  },
  getUserByID: (userID: number) => {
    try {
      console.log("getUserByID was called mate");
      console.log(typeof userID);
      console.log(userID);
      if (typeof userID !== "number") {
        throw new Error(`userID should be provided`);
      }
      return UserEntity.findOneBy({ id: userID });
    } catch (err) {
      throw new Error(`error occurred while getting user by ID: ${err}`);
    }
  },

  setUserCurrentChallenge(userID: number, challenge: string) {
    if (typeof userID !== "number" || !challenge) {
      throw new Error(`user or challenge should be provided`);
    }
    try {
      return UserEntity.update(
        { id: userID },
        { current_challenge: challenge }
      );
    } catch (err) {
      throw new Error(`error occurred while setting challenge: ${err}`);
    }
  },
};
