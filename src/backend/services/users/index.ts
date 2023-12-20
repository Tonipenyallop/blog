import { userRepository } from "../../repositories/users/index";
import { AuthService } from "../../services/auth";
import { User } from "../../../types";
export const userService = {
  signUp: async (user: User) => {
    try {
      console.log("signUp was called");
      const { username, password, email } = user;
      console.log("username, password, email");
      console.log(username, password, email);
      if (!username || !password || !email) {
        return null;
      }
      await userRepository.createUser(user);
      console.log("can you see me");
      const option = await AuthService.createRegistrationOption(email);
      return option;
    } catch (err) {
      throw new Error(`error while signing up ${err}`);
    }
  },
};
