import express, { Request, Response } from "express";
import { userService } from "../../services/users/index";
import { authService } from "../../services/auth/index";
import { User } from "../../../types";
import dotenv from "dotenv";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

dotenv.config();

const isProduction = process.env.REACT_APP_IS_PRODUCTION ?? false;

// Human-readable title for your website
const rpName = "Toni blog";
// A unique identifier for your website
const rpID = isProduction ? process.env.PRODUCTION_DOMAIN : "localhost";
// The URL at which registrations and authentications should occur
const origin = `https://${rpID}`;

const UserRouter = express.Router();

UserRouter.post("/sign-up", async (req: Request<User>, res: Response) => {
  try {
    const user = req.body as User;
    const userData = await userService.signUp(user);
    if (userData === null) {
      return res.sendStatus(400);
    }
    // authenticate here
    return res.status(201).send(userData);
  } catch (err) {
    console.error(`err while getting posts: ${err}`);
    throw err;
  }
});

export default UserRouter;
