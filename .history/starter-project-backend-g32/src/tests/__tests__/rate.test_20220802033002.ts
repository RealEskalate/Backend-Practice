import Rate from "../../models/Rate";
import mongoose from "mongoose";
import request from "supertest";
import routes from "../../routes";
import express from "express";
import { connect, disconnect, clear } from "../setupdb";

const app = express();
beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  const rateSchema = {
    rate: 1
  };
  const newUser = new Rate(rateSchema);
  await newUser.save();
});

afterAll(async () => {
  await disconnect();
}, 100000);

afterEach(async () => {
  await clear();
});

app.use(express.json());
app.use("/users/8999/po", routes.rateRouter);

describe("Integration testing for user routes", () => {
  it("should fail to create a user", async () => {
    let rate = {};
    try {
      const newUser = new Rate(rate);
      await newUser.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it("Post user request", async () => {
    const { body, statusCode } = await request(app).post("/userProfile").send({
      firstName: "John",
      lastName: "Doe",
      email: "johnDoe@gmail.com",
      password: "johnDoe",
    });
    expect(body).not.toBeFalsy();
    expect(statusCode).toBe(200);
  });

  it("Get all request ", async () => {
    const { body, statusCode } = await request(app).get("/userProfile");
    expect(body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            profilePic: expect.any(String),
          }),
        ]),
      })
    );
    expect(statusCode).toBe(200);
  });
});
