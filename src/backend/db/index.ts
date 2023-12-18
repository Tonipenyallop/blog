import "reflect-metadata";
import { DataSource } from "typeorm";
import { AllEntities } from "../entities/index";

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

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  synchronize: true,
  logging: false,
  // as many entities as possible
  entities: AllEntities,
  migrations: [],
  subscribers: [],
});
