import app from "../../src/app"
import {connect, disconnect} from "./setupdb"
import request from 'supertest'
const controller =require("../../src/controllers")
jest.setTimeout(100000)
describe("Rating model tests",()=>{
    beforeAll(async () =>{
        await connect()
    })
    afterAll(async ()=>{
        await disconnect()
    })

    describe("POST request",()=>{
        describe("Check whether the rating is created",()=>{
            it("Should return a status cod of 201 if created",async ()=>{
                const response = await request(app)

            .post("/rating").send({
                articleId:"Wk8l9ji",
                userId:"kf892nf",
                rating:5
            }).set('Accept', 'application/json');
            expect(response.statusCode).toEqual(201);
            })
        })
    });

    describe("fetchAll request",()=>{
        describe("Checking  fetchAll  Ratings data",()=>{
            it("Should return a status cod of 200 if created",async ()=>{
                const response = await request(app)
            .get("/rating");
            expect(response.statusCode).toEqual(200);
            })
        })
    })

    describe("fetchOne request",()=>{
        describe("Checking  fetch  Rating data",()=>{
            it("Should return a status cod of 200 if fetched",async ()=>{
                
                const mockRatingResponse =  await controller.create({
                    "articleId":"7hgshihd",
                    "userId":"895ncdiH",
                    "rating":5
                });
            const response = await request(app)
            .get(`/rating/${mockRatingResponse.message._id}`);
            expect(response.statusCode).toEqual(200);
        
            })
        })
    })

    describe("Update request",()=>{
        describe("Checking  update  Rating data",()=>{
            
            it("Should return a status cod of 201 if updated",async ()=>{
                
                const mockRatingResponse =  await controller.create({
                    "articleId":"7hgshihd",
                    "userId":"895ncdiH",
                    "rating":5
                });
            const response = await request(app)
            .put(`/rating/${mockRatingResponse.message._id}`).send({
                rating:10
            });
            expect(response.statusCode).toEqual(200);
        
            })
        })
    });

    describe("Delete request",()=>{
        describe("Checking  Delet  Rating data",()=>{
            it("Should return a status cod of 201 if deleted",async ()=>{
                
                const mockRatingResponse =  await controller.create({
                    "articleId":"7hgshihd",
                    "userId":"895ncdiH",
                    "rating":5
                });
            const response = await request(app)
            .delete(`/rating/${mockRatingResponse.message._id}`);
            expect(response.statusCode).toEqual(201);
        
            })
    })
})
})