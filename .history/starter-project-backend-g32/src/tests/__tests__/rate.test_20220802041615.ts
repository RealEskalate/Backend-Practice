import supertest from "supertest";
import app from "../../app";
const request = supertest(app);
let rate: string

import { connect, disconnect } from "../setupdb";
describe("API test", () => {
  beforeAll(() => {
    connect();
  });

  afterAll(() => {
    disconnect();
  });

  describe("POST /api/test", () => {
    it("example request using a mocked database instance", async () => {
      const res = await request.post("/users/8888/posts/89887/rates", {
        rate: 5,
      });
      expect(res.status).toBe(201);
    });
  });
});
