import { PrismaClient } from "@prisma/client";
import { createRandomToken } from "../utils/random";

export const upsertSubscriber = async (prisma: PrismaClient, email: string) => {
  try {
    // upsert the subscriber
    // if the subscriber already exists, do nothing
    const newsletterSubscriber = await prisma.newsletterSubscriber.upsert({
      create: {
        email,
        active: false,
        confirmed: false,
        token: createRandomToken(),
      },
      update: {
        active: false,
        confirmed: false,
        token: createRandomToken(),
      },
      where: {
        email,
      },
    });
    return newsletterSubscriber;
  } catch (error) {
    throw new Error("Could not upsert subscriber");
  }
};
