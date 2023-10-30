import { Pool } from "pg";
import dotenv from "dotenv";
console.log("starting up database");
// loading environment variables
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
