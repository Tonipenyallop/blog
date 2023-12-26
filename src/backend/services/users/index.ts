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
};
