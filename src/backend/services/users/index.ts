import { userRepository } from "../../repositories/users/index";
import { AuthService } from "../../services/auth";
import { User } from "../../../types";
export const userService = {
  signUp: async (user: User) => {
    try {
      const { username, password, email } = user;

      if (!username || !password || !email) {
        return null;
      }
      await userRepository.createUser(user);

      const option = await AuthService.createRegistrationOption(email);
      return option;
    } catch (err) {
      throw new Error(`error while signing up ${err}`);
    }
  },
  login: async (password: string, email: string) => {
    try {
      if (!password || !email) {
        return null;
      }
      return userRepository.compareUserPassword(password, email);
    } catch (err) {
      throw new Error(`error while logging in ${err}`);
    }
  },
  setAuthenticatorID: async (email: string, authenticatorRawID: string) => {
    if (!email || !authenticatorRawID) {
      return null;
    }
    try {
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        return null;
      }
      return userRepository.setAuthenticatorID(user.id, authenticatorRawID);
    } catch (err) {
      throw new Error("error while setting authenticator ID");
    }
  },
};
