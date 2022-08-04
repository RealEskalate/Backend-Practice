import supertest from "supertest";
import { connect, clear, disconnect } from "../setupdb";
import app from "../../app"
import {Rating} from "../../models/rating"
import {Article} from "../../models/article"

jest.setTimeout(5000);
describe("Test for Rating endpoint", () => {
	
    beforeAll(async () => await connect());
    afterAll(async () => {
        await clear()
        await disconnect()});
    
    describe("Tests the GET endpoints", () => {
        describe("/api/ratings", () => {
            it("returns status code 200 if the ratings found", async () => {
                const response = await supertest(app).get("/api/ratings");
				expect(response.statusCode).toBe(200)
				expect.arrayContaining(
					[
						{
							articleID: expect.any(String),
							userID: expect.any(String),
							rating: expect.any(Number),
							ratedAt: expect.any(String)
						}
					]
				);
            });
        });
        
        describe("/api/ratings/{id}", () => {
            it("returns status code 200 if the rating exists", async () => {
                const testRating = await Rating.create({
                    "articleID": "12344",
                    "userID": "54321",
                    "rating": 3
                });
                const response = await supertest(app).get(`/api/ratings/${testRating._id}`);
                expect(response.statusCode).toBe(200)
                expect.objectContaining(
					{
						articleID: expect.any(String),
						userID: expect.any(String),
						rating: expect.any(Number),
						ratedAt: expect.any(String)
					}
				);
            })
            it("returns status code 404 if the rating doesnot exist", async () => {
                await supertest(app).get("/api/ratings/unknown").expect(404)
            })
        })

        describe("/api/ratings/articles/{id}", () => {
            it("returns status code 200 if the rating exists", async () => {
                const testRating = await Rating.create({
                    "articleID": "12344",
                    "userID": "54321",
                    "rating": 3
                })      
                const response = await supertest(app).get(`/api/ratings/articles/${testRating.articleID}`)
		
				expect(response.statusCode).toBe(200)
                expect.objectContaining(
					{
						articleID: expect.any(String),
						userID: expect.any(String),
						rating: expect.any(Number),
						ratedAt: expect.any(String)
					}
				);
            })
            it("returns status code 404 if the rating doesnot exist", async () => {
                await supertest(app).get("/api/ratings/articles/unknown").expect(404)
            })
        })

        describe("/api/ratings/users/{userID}", () => {
            it("returns status code 200 if the rating exists", async () => {
                const testRating = await Rating.create({
                    "articleID": "12344",
                    "userID": "54321",
                    "rating": 3
                })
                const response = await supertest(app).get(`/api/ratings/users/${testRating.userID}`)
													 .set('Content-Type', 'application/x-www-form-urlencoded')
				expect(response.statusCode).toBe(200)
                expect.objectContaining(
					{
						articleID: expect.any(String),
						userID: expect.any(String),
						rating: expect.any(Number),
						ratedAt: expect.any(String)
					}
				);
            })
            it("returns status code 404 if the rating doesnot exist", async () => {
                await supertest(app).get("/api/ratings/users/unknown").expect(404)
            })
        })
        
        describe("/api/ratings/{articleID}/{userID}", () => {
            it("returns status code 200 if the ratings exists", async () => {
                const testRating = await Rating.create({
                    "articleID": "12344",
                    "userID": "54321",
                    "rating": 3
                })
                const response = await supertest(app).get(`/api/ratings/${testRating.articleID}/${testRating.userID}`)
													 .set('Content-Type', 'application/x-www-form-urlencoded')
				expect(response.statusCode).toBe(200)
                expect.arrayContaining(
					[
						{
							articleID: expect.any(String),
							userID: expect.any(String),
							rating: expect.any(Number),
							ratedAt: expect.any(String)
						}
					]
				);
            })
            it("returns status code 404 if the rating doesnot exist", async () => {
                await supertest(app).get("/api/ratings/unknown/unknown").expect(404)
            })
        })
        
    });

    describe("Tests the POST endpoint", () => {
        describe("/rating", () => {
            
            it("returns status code 201 on succesful creation", async () => {
                var testArticle = await Article.create({
                    author: "tester x",
                    content: "sdkfja;sdkfja;lskfja;lfjka;sfjka;sfklj",
                    comment: "no comment",
                    averageRating: 0
                })
                await supertest(app)
                        .post("/api/ratings")
                        .send({
                            "articleID": testArticle._id,
                            "userID": "843702",
                            "rating": 3
                        })
                        .set('Accept', 'application/json')
                        .expect(201)
                        
            });
            it("returns status code 200 if the rating is already there and changes the old rating with the new one", async () => {
                var testArticle = await Article.create({
                    author: "tester x",
                    content: "sdkfja;sdkfja;lskfja;lfjka;sfjka;sfklj",
                    comment: "no comment",
                    averageRating: 0

                })
                const testRating = await Rating.create({
                    "articleID": testArticle._id,
                    "userID": "843702",
                    "rating": 3
                })
                await supertest(app)
                        .post("/api/ratings")
                        .send({
                            "articleID": testArticle._id,
                            "userID": "843702",
                            "rating": 5
                        })
                        .set('Accept', 'application/json')
                        .expect(200)
            });
            it("returns status code 400 if one of the fields are missing or invalid", async () => {
                await supertest(app)
                        .post("/api/ratings")
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
                const testArticle = await Article.create({
                    author: "tester x",
                    content: "sdkfja;sdkfja;lskfja;lfjka;sfjka;sfklj",
                    comment: "no comment",
                    averageRating: 0

                });
                const testRating = await Rating.create({
                    "articleID": testArticle._id,
                    "userID": "54321",
                    "rating": 3
                })
                await supertest(app)
                        .put(`/api/ratings/${testRating._id}`)
                        .send({
                            "rating": 3
                        })
                        .expect(200)
            })
    
            it("returns 404 if the rating with the given id does not exist", async () => {
                await supertest(app)
                        .put("/api/ratings/unknown")
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
                        .delete(`/api/ratings/${testRating._id}`)
                        .send()
                        .expect(200)
            });
            it("returns 404 if the user to be deleted is not found", async () => {
                await supertest(app)
                        .delete("/api/ratings/12")
                        .send()
                        .expect(404)
            });
            
        })
        
    })

})
afterAll( async () => await disconnect());