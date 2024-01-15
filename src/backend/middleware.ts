import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { JWTToken } from "../types";
dotenv.config();

const { JWT_PRIVATE_KEY } = process.env;

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}

export function authorizeToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("cookie");

  if (!token) {
    return res.sendStatus(401);
  }

  console.log("token");
  console.log(token);
  const jwtCookie = token.split("=")[1];
  const decodedToken = jwt.verify(jwtCookie, JWT_PRIVATE_KEY as string);

  req.user = decodedToken;

  next();
}
