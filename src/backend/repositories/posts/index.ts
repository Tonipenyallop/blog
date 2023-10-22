import { pool } from "../../db/index";
// posts repository

export const postRepository = {
  // GET method to get all of posts

  // POST method to store posts
  createPost: async () => {
    try {
      const results = await pool.query("SELECT * FROM blogschema.posts");
      console.log("results.rows");
      console.log(results.rows);
      return results.rows;
    } catch (err) {
      console.error(`error occurred while sending SELECT schema: ${err}`);
    }
  },
};
