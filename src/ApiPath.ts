import dotenv from "dotenv";

dotenv.config();
console.log("process.env.REACT_APP_IS_PRODUCTION");
console.log(process.env.REACT_APP_IS_PRODUCTION);
const isProduction = process.env.REACT_APP_IS_PRODUCTION ?? false;
console.log("isProduction");
console.log(isProduction);

const ApiPath = isProduction
  ? process.env.PRODUCTION_API_DOMAIN
  : "http://localhost:3001";

export default ApiPath;
