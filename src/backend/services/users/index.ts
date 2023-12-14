import { userRepository } from "../../repositories/users/index";
import { User } from "../../../types";
export const userService = {
  signUp: (user: User) => {
    const { username, password } = user;
    if (!username || !password) {
      return null;
    }
    return userRepository.signUp(user);
  },
};
