import supertest from "supertest";
import { connect, clear, disconnect } from "./setupdb";
import app from "../app"
import {Rating} from "../models/rating"

jest.setTimeout(100000)

describe("Test for Rating endpoint", () => {
    beforeAll(async () => await connect());
    afterAll(async () => {
        await clear()
        await disconnect()});
    
    describe("Tests the GET endpoints", () => {
        describe("/ratings", () => {
            it("returns status code 200 if the ratings found", async () => {
                await supertest(app).get("/ratings").expect(200);
            });
        })
        
        describe("/ratings/{id}", () => {
            it("returns status code 200 if the user exists", async () => {
                const testRating = await Rating.create({
                    "articleID": "12344",
                    "userID": "54321",
                    "rating": 3
                })
                await supertest(app).get(`/ratings/${testRating._id}`).set('Content-Type', 'application/x-www-form-urlencoded').expect(200)
            })
            it("returns status code 404 if the user doesnot exist", async () => {
                await supertest(app).get("/ratings/unknown").expect(404)
            })
        })
        
    });

    describe("Tests the POST endpoint", () => {
        describe("/rating", () => {
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
            it("returns status code 200 if the rating is already there and changes the old rating with the new one", async () => {
                await supertest(app)
                        .post("/ratings")
                        .send({
                            "articleID": "12344555",
                            "userID": "843702",
                            "rating": 5
                        })
                        .set('Accept', 'application/json')
                        .expect(200)
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
        })
        
    });

    describe("Tests the PUT endpoint", () => {
        describe("/rating/{id}", () => {
            it("returns 200 if the edit is succesful", async () => {
                const testRating = await Rating.create({
                    "articleID": "12344",
                    "userID": "54321",
                    "rating": 3
                })
                await supertest(app)
                        .put(`/ratings/${testRating._id}`)
                        .send({
                            "rating": 3
                        })
                        .expect(200)
            })
    
            it("returns 404 if the rating with the given id does not exist", async () => {
                await supertest(app)
                        .put("/ratings/unknown")
                        .send({
                            "rating": 3
                        })
                        .expect(404)
            })
        })
        
    })

    describe("Tests the DELETE endpoint", () => {
        describe("/rating/{id}", () => {
            it("returns 200 if the delete is succesful", async () => {
                const testRating = await Rating.create({
                    "articleID": "12344",
                    "userID": "54321",
                    "rating": 3
                })
                await supertest(app)
                        .delete(`/ratings/${testRating._id}`)
                        .send()
                        .expect(200)
            });
            it("returns 404 if the user to be deleted is not found", async () => {
                await supertest(app)
                        .delete("/ratings/12")
                        .send()
                        .expect(404)
            });
            
        })
        
    })

})