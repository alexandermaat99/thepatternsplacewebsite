import { Request, Response } from "express";
import { isEmailValid } from "../../utils/email";
import { PrismaClient } from "@prisma/client";
import { upsertSubscriber } from "../../services/newsletter";
import { ErrorCode } from "../../errors/api-error";
import HttpStatus from "http-status";

interface SignupPayLoad {
  email?: string;
}

export const signupHandler =
  (prisma: PrismaClient) => async (request: Request, response: Response) => {
    try {
      const { email = "" } = request.body as SignupPayLoad;

      if (!email) {
        throw new ErrorCode("ERR-001", "Email");
      }
      if (!isEmailValid(email)) {
        throw new ErrorCode("ERR-002", "Email");
      }

      const newsletterSubscriber = await upsertSubscriber(prisma, email);

      console.log("signupHandler: Signup Successful");

      return response.status(HttpStatus.OK).json({ newsletterSubscriber });
    } catch (error: unknown) {
      if (!(error instanceof ErrorCode)) {
        console.log("signupHandler :", error);
        throw new Error(String(error));
      }

      if (["ERR-001", "ERR-002"].includes(error.code)) {
        return response.status(HttpStatus.BAD_REQUEST).json(error.message);
      }
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  };
