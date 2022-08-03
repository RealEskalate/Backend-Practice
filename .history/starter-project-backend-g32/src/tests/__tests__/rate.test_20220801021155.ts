import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
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
const request = supertest(app);
jest.setTimeout(30000);

describe("Rate ", () => {
  it("should be able to create new rate", async () => {
    const response = await request
      .post("/users/:userID/posts/:postID/rates")
      .send({
        rate: 1,
      });
    expect(response.status).toBe(200);
  })
});

describe("GET /users/:userID/posts/:postID/rates", () => {
  it("get valid specified rates", async () => {
    const res = await agent
      .get("/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates")
      .send();
    expect(res.statusCode).toEqual(200);
  });
  it("fail fetching specified nonexistent rate", async () => {
    const res = await agent
      .get("/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates")
      .send();
    expect(res.statusCode).toEqual(404);
  });
});
