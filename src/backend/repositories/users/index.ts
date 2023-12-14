import { pool } from "../../db/index";
import { User } from "../../../types";
import bcrypt from "bcrypt";
export const userRepository = {
  signUp: async (user: User) => {
    const { username, password } = user;
    if (!username || !password) {
      throw new Error(`username or password should be provided`);
    }
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      await pool.query(
        `INSERT INTO blogschema.users (username, password) VALUES ($1, $2)`,
        [username, hashedPassword]
      );
    } catch (err) {
      throw new Error(`error occurred while sending SELECT schema: ${err}`);
    }
  },
};
