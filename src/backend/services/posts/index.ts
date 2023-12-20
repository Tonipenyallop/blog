import { postRepository } from "../../repositories/posts/index";
import { Post } from "../../entities/post.entity";
export const postService = {
  createPost: (userID: number, post: Post) => {
    return postRepository.createPost(userID, post);
  },
  getAllPosts: (userID: number) => {
    return postRepository.getAllPosts(userID);
  },
  deletePost: (postId: number) => {
    if (!postId) return null;
    return postRepository.deletePost(postId);
  },
  updatePost: (postId: number, context: string) => {
    if (!postId || !context) return null;
    return postRepository.updatePost(postId, context);
  },
};
