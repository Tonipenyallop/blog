import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3333;

// For enabling body parsing
app.use(express.json());

app.post("/create", (req: Request, res: Response) => {
  const { text } = req.body;

  return res.json(text);
});

app.listen(PORT, () => console.log(`Listing PORT:${PORT}`));
