import supertest from "supertest";
import { connect, clear, disconnect } from "./setupdb";
import app from "../app"

jest.setTimeout(100000)

describe("Test for Rating endpoint", () => {
    beforeAll(async () => await connect());
    afterAll(async () => await disconnect());
    
    describe("Tests the GET endpoints", () => {
        it("returns status code 200 if the server responds", async () => {
            await supertest(app).get("/ratings").expect(200);
        });

        it("returns status code 200 if the user exists", async () => {
            await supertest(app).get("/ratings/62e2f5f088036d19bcb88d3c").set('Content-Type', 'application/x-www-form-urlencoded').expect(404)
        })
    });

    describe("Tests the POST endpoint", () => {
        it("returns status code 201 on succesful creation", async () => {
            await supertest(app)
                    .post("/ratings")
                    .send({
                        "articleID": "12344555",
                        "userID": "843702",
                        "rating": 3
                    })
                    .set('Accept', 'application/json')
                    .expect(201)
        });

        it("returns status code 400 if one of the fields are missing or invalid", async () => {
            await supertest(app)
                    .post("/ratings")
                    .send({
                        "userID": "843702",
                        "rating": 3
                    })
                    .set('Accept', 'application/json')
                    .expect(400)
        });
    });

    describe("Tests the PUT endpoint", () => {
        it("returns 200 if the edit is succesful", async () => {
            await supertest(app)
                    .put("/ratings/62e2f5f088036d19bcb88d3c")
                    .send({
                        "rating": 3
                    })
                    .expect(200)
        })
    })

})