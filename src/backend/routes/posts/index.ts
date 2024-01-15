import express, { Request, Response } from "express";
import { postService } from "../../services/posts/index";
import { Post } from "../../entities/post.entity";
import { authorizeToken } from "../../middleware";
import { JWTToken } from "../../../types";

const PostRouter = express.Router();

PostRouter.post(
  "/create",
  authorizeToken,
  async (req: Request, res: Response) => {
    const user = req.user as JWTToken;
    const post = req.body as Post;

    const { userID, username } = user;

    post.author = username;

    try {
      const postData = await postService.createPost(Number(userID), post);
      return res.status(201).send(postData);
    } catch (err) {
      console.error(`err while creating post: ${err}`);
      throw err;
    }
  }
);

PostRouter.get("/", authorizeToken, async (req: Request, res: Response) => {
  try {
    const user = req.user as JWTToken;
    const { userID } = user;

    const posts = await postService.getAllPosts(Number(userID));
    return res.status(200).send(posts);
  } catch (err) {
    console.error(`err while getting posts: ${err}`);
    throw err;
  }
});

PostRouter.delete(
  "/:postID",
  authorizeToken,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as JWTToken;

      const { userID } = user;
      const { postID } = req.params;

      await postService.deletePost(Number(userID), Number(postID));
      return res.sendStatus(204);
    } catch (err) {
      console.error(`err while getting posts: ${err}`);
      throw err;
    }
  }
);

PostRouter.post("/:postId", async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { context } = req.body;

    await postService.updatePost(Number(postId), context);
    return res.sendStatus(200);
  } catch (err) {
    console.error(`error while updating post:${err}`);
    throw err;
  }
});

export default PostRouter;
