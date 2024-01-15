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
  // for registering the user
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

  compareUserPassword: async (password: string, email: string) => {
    try {
      if (!email || !password) {
        throw new Error(`userID should be provided`);
      }
      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        throw new Error(`user doesn't exist`);
      }

      return bcrypt.compareSync(password, user.password);
    } catch (err) {
      throw new Error(
        "error occurred while getting user by email and password"
      );
    }
  },
  getUserByID: (userID: number) => {
    try {
      if (typeof userID !== "number") {
        throw new Error(`userID should be provided`);
      }
      return UserEntity.findOneBy({ id: userID });
    } catch (err) {
      throw new Error(`error occurred while getting user by ID: ${err}`);
    }
  },

  getUsername: async (userID: number) => {
    try {
      if (typeof userID !== "number") {
        throw new Error(`userID should be provided`);
      }
      const user = await UserEntity.findOneBy({ id: userID });

      if (!user) {
        return null;
      }

      return user.username;
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
  setAuthenticatorID(userID: number, authenticatorRawID: string) {
    if (typeof userID !== "number" || !authenticatorRawID) {
      throw new Error("userID or authenticatorRawID should be provided");
    }
    try {
      UserEntity.update(
        { id: userID },
        {
          authenticator_id: authenticatorRawID,
        }
      );
    } catch (err) {
      throw new Error(`error occurred while setting authenticator ID: ${err}`);
    }
  },
};
