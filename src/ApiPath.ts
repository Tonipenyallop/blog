import dotenv from "dotenv";
import { Environment } from "./types";

dotenv.config();

console.log("process.env.NODE_ENV");
console.log(process.env.NODE_ENV);
console.log("Environment.PRODUCTION");
console.log(Environment.PRODUCTION);
export const isProduction = process.env.NODE_ENV === Environment.PRODUCTION;

const ApiPath = isProduction
  ? process.env.REACT_APP_PRODUCTION_API_DOMAIN
  : "http://localhost:3001";
console.log("ApiPath");
console.log(ApiPath);

export default ApiPath;
