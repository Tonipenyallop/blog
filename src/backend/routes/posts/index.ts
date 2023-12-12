import express, { Request, Response } from "express";
import { postService } from "../../services/posts/index";
import { Post } from "../../../types";

const PostRouter = express.Router();

PostRouter.post("/create", async (req: Request, res: Response) => {
  const post = req.body as Post;

  try {
    const postData = await postService.createPost(post);
    return res.status(201).send(postData);
  } catch (err) {
    console.error(`err while creating post: ${err}`);
    throw err;
  }
});

PostRouter.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).send(posts);
  } catch (err) {
    console.error(`err while getting posts: ${err}`);
    throw err;
  }
});

PostRouter.delete("/:postId", async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    await postService.deletePost(Number(postId));
    return res.sendStatus(204);
  } catch (err) {
    console.error(`err while getting posts: ${err}`);
    throw err;
  }
});

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
