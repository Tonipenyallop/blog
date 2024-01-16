import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTToken } from "../../../types";
import dotenv from "dotenv";
import { userService } from "../../services/users";

dotenv.config();

const { JWT_PRIVATE_KEY } = process.env;
const AuthRouter = express.Router();

AuthRouter.post("/token", async (req: Request, res: Response) => {
  const { userID } = req.body;
  if (!userID) {
    return res.sendStatus(401);
  }

  const username = await userService.getUsername(Number(userID));

  if (!username) {
    return res.sendStatus(401);
  }

  const jwtToken: JWTToken = { userID, username };
  const token = jwt.sign(jwtToken, JWT_PRIVATE_KEY as string, {
    algorithm: "HS256",
  });
  res.cookie("jwt", token);
  return res.status(200).json({ message: "token successfully added" });
});

export default AuthRouter;
