import express from "express";
import { signupHandler } from "./signup";
import { PrismaClient } from "@prisma/client";

export const createNewsletterRouter = (prisma: PrismaClient) => {
  const newsletterRouter = express.Router();

  newsletterRouter.post("/newsletter/signup", signupHandler(prisma));

  return newsletterRouter;
};
