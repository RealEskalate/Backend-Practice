import supertest from "supertest";
import app from "../../app";
const request = supertest(app);
let rate: number = 0;

import { connect, disconnect } from "../setupdb";

beforeAll(async () => {
  connect();
});

afterAll(async () => {
  disconnect();
});

// post check
describe("POST /users/:userID/posts/:postID/rates", () => {
  it("should return a 201 status code", async () => {
    const response = await request
      .post(
        "/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates"
      )
      .send({
        rate: 5,
      });
    expect(response.status).toBe(201);
  });
});

describe("GET /users/:userID/posts/:postID/rates", () => {
  it("shoud return 200 status code and retun the rating", async () => {
    const curr_rate = { rate: 5 };
    const response = await request
      .get("/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates")
      .send();
    expect(response.status).toBe(200);
    expect(response.body.data.rate).toBe(curr_rate);
  });
});
