import { postRepository } from "../../repositories/posts/index";

export const postService = {
  createPost: () => {
    return postRepository.createPost();
  },
};
