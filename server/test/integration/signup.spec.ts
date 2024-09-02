import request from "supertest";
import HttpStatus from "http-status";
import { createServer } from "../../src/server";
import { PrismaClient } from "@prisma/client";

describe("signup", () => {
  const prisma = new PrismaClient();
  const server = createServer({ prisma }).listen(80);

  it("should throw 400 if not send an email in body", async () => {
    await request(server)
      .post("/v1/newsletter/signup")
      .send()
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("should return 200 if a valid email is sent", async () => {}
    
        await request(server)
        .post("/v1/newsletter/signup")
        .send({ email: "

});
