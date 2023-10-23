import express, { Request, Response } from "express";
import { postService } from "./services/posts/index";
import { Post } from "../types";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3333;

// For enabling body parsing
app.use(express.json());

// For enabling GET request
app.use(cors());

app.post("/create", async (req: Request, res: Response) => {
  const post = req.body as Post;

  try {
    const postData = await postService.createPost(post);
    return res.status(201).send(postData);
  } catch (err) {
    console.error(`err while creating post: ${err}`);
    throw err;
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).send(posts);
  } catch (err) {
    console.error(`err while getting posts: ${err}`);
    throw err;
  }
});

app.delete("/post/:postId", async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    await postService.deletePost(Number(postId));
    return res.sendStatus(204);
  } catch (err) {
    console.error(`err while getting posts: ${err}`);
    throw err;
  }
});

app.listen(PORT, () => console.log(`Listing PORT:${PORT}`));
