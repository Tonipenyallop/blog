import { userRepository } from "../../repositories/users/index";
import { User } from "../../../types";
export const userService = {
  signUp: (user: User) => {
    const { username, password, email } = user;
    if (!username || !password || !email) {
      return null;
    }
    return userRepository.signUp(user);
  },
};
