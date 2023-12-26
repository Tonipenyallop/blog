import express, { Request, Response } from "express";
import { userService } from "../../services/users/index";
import { AuthService } from "../../services/auth/index";
import { User } from "../../../types";

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

export default UserRouter;
