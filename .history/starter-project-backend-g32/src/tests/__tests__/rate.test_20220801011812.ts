import request from "supertest";
import app from "../../app";
const agent = request.agent(app);
import { connect, disconnect, clea } from '../setupdb'



describe("GET /users/:userID/posts/:postID/rates", () => {
  it("should return a list of rates", async () => {
    const response = await request(app).get(
      "/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates"
    )
    .send()
    expect(response.statusCode).toEqual(200)
  });
});
