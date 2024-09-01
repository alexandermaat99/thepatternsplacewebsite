import { Request, Response } from "express";
import { isEmailValid } from "../../utils/email";
import { PrismaClient } from "@prisma/client";
import { upsertSubscriber } from "../../services/newsletter";

interface SignupPayLoad {
  email?: string;
}

export const signupHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
    try {
      const { email = "" } = request.body as SignupPayLoad;

      if (!email) {
        throw new Error("Email is required");
      }
      if (!isEmailValid(email)) {
        throw new Error("Invalid email");
      }

      const newsletterSubscriber = await upsertSubscriber(prisma, email);

      console.log("signupHandler: Signup Sucessful");

      return response.status(200).json({ message: "Success" });
    } catch (error) {
      throw new Error();
    }
  };
