import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../../app";
import Rate from "../../models/Rate";
import { connect, closeDatabase, clearDatabase } from "../setupdb";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await connect();
});

beforeEach(async () => {
  const rate = await Rate.create({
    rate: 1,
  });
});

afterAll(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase(mongoServer);
});

const agent = request.agent(app);
jest.setTimeout(30000);

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

describe("GET /users/:userID/posts/:postID/rates", () => {
  it("get valid specified rates", async () => {
    const res = await agent
      .get("/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates")
      .send();
    expect(res.statusCode).toEqual(200);
  });
  it("fail fetching specified nonexistent article", async () => {
    const res = await agent
      .get(`/api/v1/articles/${new mongoose.Types.ObjectId()}`)
      .send();
    expect(res.statusCode).toEqual(404);
  });
});
