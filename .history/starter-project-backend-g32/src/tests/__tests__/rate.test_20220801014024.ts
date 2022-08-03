import { MongoMemoryServer } from 'mongodb-memory-server';
import request from "supertest";
import app from "../../app";
const agent = request.agent(app);
import Rate from "../../models/Rate";
import { connect, disconnectDatabase, clearDatabase } from "../setupdb";

let mongoServer : MongoMemoryServer

beforeAll(async () => {
  mongoServer = await connect()
})

beforeEach( async() => {
  const rate = await Rate.create({
    rate: 1
  })
}
)



describe("GET /users/:userID/posts/:postID/rates", () => {
  it("returns status code of 201 if created", async () => {
    const response = await request(app)
      .post(
        "/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates"
      )
      .send({
        rate: 1,
      });
    expect(response.statusCode).toEqual(201);
  });
});
