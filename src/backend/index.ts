import express from "express";
import cors from "cors";
import PostRouter from "./routes/posts";
const app = express();
const PORT = process.env.PORT || 3333;

// For enabling body parsing
app.use(express.json());

// For enabling GET request
app.use(cors());

app.use("/post", PostRouter);

app.listen(PORT, () => console.log(`Listing PORT:${PORT}`));
