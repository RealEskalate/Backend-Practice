import request from "supertest";
import app from "../../app";

describe("GET /users/:userID/posts/:postID/rates", () => {
    it("should return a list of rates", async () => {
        const response = await request(app).get("/users/5e9b8f8f8f8f8f8f8f8f8f8/posts/5e9b8f8f8f8f8f8f8f8f8f8/rates");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    }).timeout(10000);
})
