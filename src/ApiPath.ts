import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.REACT_APP_IS_PRODUCTION ?? false;

const ApiPath = isProduction
  ? process.env.PRODUCTION_API_DOMAIN
  : "http://localhost:3001";

export default ApiPath;
