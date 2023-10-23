import { pool } from "../../db/index";
import { Post } from "../../../types";
// posts repository

export const postRepository = {
  getAllPosts: async () => {
    const results = await pool.query(
      `SELECT id, author, context, title, created_at FROM blogschema.posts WHERE is_deleted = false ORDER BY created_at DESC`
    );
    return results.rows;
  },

  createPost: async (post: Post) => {
    try {
      const results = await pool.query(
        `INSERT INTO blogschema.posts (title, context, author) VALUES ($1, $2, $3)`,
        [post.title, post.context, post.author]
      );

      return results.rows;
    } catch (err) {
      throw new Error(`error occurred while sending SELECT schema: ${err}`);
    }
  },
  deletePost: async (postId: number) => {
    try {
      return await pool.query(`UPDATE blogschema.posts SET
      is_deleted = true WHERE
      id = ${postId}`);
    } catch (err) {
      console.error(`error occurred while deleting post:${err}`);
      throw err;
    }
  },
};
