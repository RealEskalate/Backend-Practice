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

// post for rate
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
  it("Unable to create new rate due to required fields", async () => {
    const response = await request
      .post(
        "/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates"
      )
      .send({
        rate: "",
      });
    expect(response.status).toBe(400);
  });
});

// for get request of rates
describe("GET /users/:userID/posts/:postID/rates", () => {
  it("shoud return 200 status code and retun the rating", async () => {
    const response = await request
      .get("/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates")
      .send();
    expect(response.status).toBe(200);
  });
  
});

// for geting single rate
describe("GET /users/:userID/posts/:postID/rates/:rateID", () => {
  it("shoud return 200 status code and retun the rating", async () => {
    const response = await request
      .get("/users/1/posts/2/rates/62e30c0df63e1f36fc9802c2")
      .send();
    expect(response.status).toBe(200);
  });
});

// update the rate
describe("PUT /users/:userID/posts/:postID/rates/:rateID", () => {
  it("should return a 200 status code", async () => {
    const response = await request
      .put("/users/1/posts/2/rates/62e30c0df63e1f36fc9802c2")
      .send({
        rate: 5,
      });
    expect(response.status).toBe(200);
  });
});

// delete the rate
describe("DELETE /users/:userID/posts/:postID/rates/:rateID", () => {
  it("should return a 200 status code", async () => {
    const response = await request
      .delete("/users/1/posts/2/rates/62e30c0df63e1f36fc9802c2")
      .send();
    expect(response.status).toBe(200);
  });
});
