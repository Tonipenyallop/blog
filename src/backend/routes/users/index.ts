import express, { Request, Response } from "express";
import { userService } from "../../services/users/index";
import { AuthService } from "../../services/auth/index";
import { User } from "../../../types";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/server/script/deps";

const UserRouter = express.Router();

UserRouter.post("/sign-up", async (req: Request<User>, res: Response) => {
  try {
    const user = req.body as User;

    const userData = await userService.signUp(user);
    if (userData === null) {
      return res.sendStatus(400);
    }

    return res.status(201).send(userData);
  } catch (err) {
    return res.status(409).send({ err });
  }
});

UserRouter.post(
  "/verify-registration",
  async (req: Request<User>, res: Response) => {
    const { authenticatorResponse, userID } = req.body;
    try {
      const verified = await AuthService.verifyRegistration(
        authenticatorResponse,
        userID
      );
      return res.status(200).send(verified);
    } catch (err) {
      console.error(`err while verifying registration: ${err}`);
      throw err;
    }
  }
);

UserRouter.post("/login", async (req: Request<User>, res: Response) => {
  const { password, email } = req.body;
  try {
    const loginStatus = await userService.login(password, email);
    return res.status(200).send({ loginStatus });
  } catch (err) {
    console.error(`err while logging in : ${err}`);
    throw err;
  }
});

UserRouter.post(
  "/generate-authentication-options",
  async (req: Request<User>, res: Response) => {
    const { email } = req.body;
    try {
      const options = await AuthService.generateAuthenticationOptions(email);
      return res.status(200).send({ options });
    } catch (err) {
      console.error(`err while logging in : ${err}`);
      throw err;
    }
  }
);

UserRouter.post(
  "/verify-authentication",
  async (
    req: Request<PublicKeyCredentialRequestOptionsJSON>,
    res: Response
  ) => {
    console.log("verify-authentication");
    const { email, authenticationResponse } = req.body;
    try {
      const verification = await AuthService.verifyAuthentication(
        email,
        authenticationResponse
      );
      return res.status(200).send({ verification });
    } catch (err) {
      console.error(`err while logging in : ${err}`);
      throw err;
    }
  }
);

UserRouter.post(
  "/authenticate",
  async (req: Request<string>, res: Response) => {
    const { email, authenticatorRawID } = req.body;
    try {
      // store to auth raw id to user and auth collections
      await userService.setAuthenticatorID(email, authenticatorRawID);
      await AuthService.setRawID(email, authenticatorRawID);

      return res.sendStatus(200);
    } catch (err) {
      console.error(`err while logging in : ${err}`);
      throw err;
    }
  }
);

export default UserRouter;
