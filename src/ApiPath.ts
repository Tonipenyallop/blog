import dotenv from "dotenv";
import { Environment } from "./types";

dotenv.config();

export const isProduction =
  process.env.REACT_APP_IS_PRODUCTION === Environment.PRODUCTION;

const ApiPath = isProduction
  ? process.env.PRODUCTION_API_DOMAIN
  : "http://localhost:3001";
console.log("ApiPath");
console.log(ApiPath);

export default ApiPath;
