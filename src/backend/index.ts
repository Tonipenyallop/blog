import express from "express";
import cors from "cors";
import PostRouter from "./routes/posts";
import UserRouter from "./routes/users";
import { AppDataSource } from "./db";
const app = express();
const PORT = process.env.PORT || 3333;

// For enabling body parsing
app.use(express.json());

// For enabling GET request
app.use(cors());

app.use("/post", PostRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => console.log(`Listing PORT:${PORT}`));

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
