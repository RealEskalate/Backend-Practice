import request from "supertest";
import app from "../../app";
const agent = request.agent(app);
import { connect, disconnect, clear } from "../setupdb";

describe("GET /users/:userID/posts/:postID/rates", () => {
  it("", async () => {
    const response = await request(app)
      .post(
        "/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates"
      )
      .send({
        rate: 1
      });
    expect(response.statusCode).toEqual(200);
  });
});
