import supertest from 'supertest';
import {MongoMemoryServer} from "mongodb-memory-server";
const appCreator = require("../appCreator");
const mongoose = require('mongoose');

const app = appCreator.createApp();

// payloads For all the tests
const ratingPayload = {
    starts: 5,
    articleId: "62d510eaf474e57abb69067e",
    user: "62d510eaf474e57abb69067e",
}

const wrongRatingPayload = {
    starts: 5,
    articleId: "62d510eaf474e57abb69067e",
}

describe('Rating', ()=> {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });
    describe('get Rating routes', ()=>{
        describe('given the rating does not exist', () => {
            it('should return a 404.', async () => {
                const ratingId = new mongoose.Types.ObjectId('62d9bb72804a5a74621f838a');
                await supertest(app).get(`/api/v1/admin/${ratingId}`).expect(404);
            });
        });

        describe('given the rating does exist', () => {
            it('should return a 200 and the rating info.', async () => {
                //First lets create a rating
                const {statusCode, body } = await supertest(app).post(`/api/v1/rating`).send(ratingPayload);
                expect(statusCode).toBe(201);

                const ratingId = body.data._id;
                await supertest(app).get(`/api/v1/admin/${ratingId}`).expect(200);
            });
        });
    });

    describe('create Rating routes', ()=>{
        describe('given the rating body is passed correctly', () => {
            it('should return a 200 and create the rating.', async () => {
                const {statusCode, body } = await supertest(app).post(`/api/v1/rating`).send(ratingPayload);
                expect(statusCode).toBe(201);
                const data = body.data;

                // expect(Object.keys(data).length).toEqual(5);
                expect(data).toEqual(expect.objectContaining({
                    _id: expect.any(String),
                    articleId: expect.any(String),
                    user: expect.any(String)
                    }))
            });
        });
        describe('given the rating request body is passed incorrectly', () => {
            it('should return a 400.', async () => {
                await supertest(app).post(`/api/v1/rating`).send(wrongRatingPayload).expect(400);
            });
        });
    });
});