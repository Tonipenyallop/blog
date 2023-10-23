import { postRepository } from "../../repositories/posts/index";
import { Post } from "../../../types";
export const postService = {
  createPost: (post: Post) => {
    return postRepository.createPost(post);
  },
  getAllPosts: () => {
    return postRepository.getAllPosts();
  },
  deletePost: (postId: number) => {
    if (!postId) return null;
    return postRepository.deletePost(postId);
  },
};
