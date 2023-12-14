import { userRepository } from "../../repositories/users/index";
import { User } from "../../../types";
export const userService = {
  signUp: (user: User) => {
    return userRepository.signUp(user);
  },
};
