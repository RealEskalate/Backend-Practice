import {request, Request, response} from "express";
import * as dbHandler from "../setupdb";
import app from "../../app";
import mongoose from "mongoose";
import supertest from "supertest";
import user from '../../models/userProfile'
import { getUserById,createUserProfile,getUserProfile, updateById, deleteUser} from "../../controllers/userProfile"
import User from "../../models/userProfile";
const Id = new mongoose.Types.ObjectId().toString();
jest.setTimeout(50000);

beforeAll(async() => {
    await dbHandler.connect();
});

afterEach(async() => {
    await dbHandler.clear();
});

afterAll(async () => {
    await dbHandler.disconnect();
});

describe("get test ", () => {
    it("return all users ", async () => {
        await User.collection.insertMany([
            {
                firstName:"abcabc",
                lastName: "abcabc",
                email: "abcabc@gmail.com",
                role: "ababa",
                phoneNumber: "0909090909",
              }
        ]);
        const res = await supertest(app).get("/api/")

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data.some((a: any) => a.firstName === "abcabc")).toBeTruthy();
    });
});

describe('UPDATE BY ID /', () => {
    it('should update a user', async() => {
        let user = new User({
                firstName:"abcabc",
                lastName: "abcabc",
                email: "abcabc@gmail.com",
                role: "ababa",
                phoneNumber: "0909090909",
        });
        user = await user.save();

        const res = await supertest(app).put('/api/' + user.id).send({
                firstName:"tsega",
                lastName: "abcabc",
                email: "abcabc@gmail.com",
                role: "ababa",
                phoneNumber: "0909090909",
        });
        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty('firstName', 'tsega');

    });
    it('should return 404 status if invalid id is passed',async () => {
        const res = await supertest(app).put('/api/1');
        expect(res.status).toBe(404);

    });
    it('should return 404', async() => {
        let user = new User({
                firstName:"abcabc",
                lastName: "abcabc",
                email: "abcabc@gmail.com",
                phoneNumber: "0909090909",
        });

        const res = await supertest(app).put('/api/' + user.id).send({
                firstName:"tsega",
                lastName: "abcabc",
                email: "abcabc@gmail.com",
                phoneNumber: "0909090909",
        });
        expect(res.status).toBe(404);

    });
});


describe("create user ", () => {
    it("create valid user ", async () => {
        const user = {
            firstName:"abcabc",
            lastName: "abcabc",
            email: "abcabc@gmail.com",
            role: "ababa",
            phoneNumber: "0909090909",};
        const res = await supertest(app).post("/api").send(user);
        expect(res.status).toBe(201);
    });

    it('should return 500 when the data is invalid or required data is empty', async () => {
        const user = {
            lastName: "abcabc",
            email: "abcabc@gmail.com",
            phoneNumber: "0909090909",};
        const res = await supertest(app).post("/api").send(user);
        expect(res.status).toBe(500);
    });
});

describe("delete by id", () => {
    it("should delete the user by its id", async () => {
        let user = new User({
            firstName:"abcabc",
            lastName: "abcabc",
            email: "abcabc@gmail.com",
            phoneNumber: "0909090909",});
        await user.save();
        const res = await supertest(app).delete("/api/" + user.id);
        expect(res.status).toBe(201);
    });
    it("should return 404 status if the id is invalid or user not found", async () => {
        let user = new User({
            firstName:"abcabc",
            lastName: "abcabc",
            email: "abcabc@gmail.com",
            phoneNumber: "0909090909",});
            await user.save();
            const res = await supertest(app).delete("/api/1");
            expect(res.status).toBe(404);
        });
        
    
    });

describe('get user by id', () => {
    it("should return 200 when their is valid user in a given id", async () => {
        let user = new User({
            firstName:"abcabc",
            lastName: "abcabc",
            email: "abcabc@gmail.com",
            phoneNumber: "0909090909",});
        user = await user.save();
        const res = await supertest(app).get("/api/" + user.id).send(user);
        expect(res.status).toBe(200);
    });

    it("should return 404 status when their is no user found in this id", async () => {
        let user = new User({
            firstName:"abcabc",
            lastName: "abcabc",
            email: "abcabc@gmail.com",
            phoneNumber: "0909090909",});
        user = await user.save();
        const res = await supertest(app).get("/api/" + Id).send(user);
        expect(res.status).toBe(404);
    });
})