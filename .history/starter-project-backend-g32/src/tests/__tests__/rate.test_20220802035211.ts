import supertest from "supertest";
import app from "../../app";
const request = supertest(app);

import { connect, disconnect, clear } from "./setupdb";
describe("API test", () => {
  beforeAll(() => {
    connectDB();
  });

  afterAll(() => {
    disconnectDB();
    server.close();
  });

  describe("POST /api/test", () => {
    it("example request using a mocked database instance", async () => {
      const res = await request.post("/api/test", {
        name: "Test",
      });

      expect(res.status).toBe(201);
    });
  });
});
