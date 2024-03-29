import { AppDataSource, pool } from "../../db/index";

import { Post } from "../../entities/post.entity";

const PostEntity = AppDataSource.getRepository(Post);

export const postRepository = {
  getAllPosts: (userID: number) => {
    if (typeof userID !== "number") {
      throw new Error(`title, context and author should be provided`);
    }

    return PostEntity.find({
      where: { user_id: userID, is_deleted: false },
      order: { created_at: "DESC" },
    });
  },

  createPost: (userID: number, post: Post) => {
    try {
      const { title, context, author } = post;
      if (typeof userID !== "number" || !title || !context || !author) {
        throw new Error(`userID, title, context and author should be provided`);
      }

      const newPost = PostEntity.create({
        title,
        context,
        author,
        user_id: userID,
      });

      return PostEntity.save(newPost);
    } catch (err) {
      throw new Error(`error occurred while creating post: ${err}`);
    }
  },
  deletePost: async (userID: number, postID: number) => {
    try {
      return PostEntity.update(
        { id: postID, user_id: userID },
        { is_deleted: true }
      );
    } catch (err) {
      console.error(`error occurred while deleting post:${err}`);
      throw err;
    }
  },
  updatePost: (postID: number, context: string) => {
    try {
      if (typeof postID !== "number" || !context) {
        throw new Error(`postID, context should be provided`);
      }
      return PostEntity.update({ id: postID }, { context });
    } catch (err) {
      console.error(`error occurred while updating post:${err}`);
      throw err;
    }
  },
};
