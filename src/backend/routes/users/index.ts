import express, { Request, Response } from "express";
import { userService } from "../../services/users/index";
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
    console.error(`err while getting posts: ${err}`);
    throw err;
  }
});

export default UserRouter;
