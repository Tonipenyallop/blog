import dotenv from "dotenv";
import { Environment } from "./types";

dotenv.config();

const isProduction = process.env.NODE_ENV === Environment.PRODUCTION;

const ApiPath = isProduction
  ? process.env.REACT_APP_PRODUCTION_API_DOMAIN
  : "http://localhost:3001";

export default ApiPath;
