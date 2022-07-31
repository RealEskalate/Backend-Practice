import {request, Request, response} from "express";
import * as dbHandler from "../setupdb";
import app from "../../app";
import mongoose from "mongoose";
import supertest from "supertest";
import {createUserProfile, getUserProfile, updateById, deleteUser} from "../../controllers/userProfile"
const Id = new mongoose.Types.ObjectId().toString();

beforeAll(async() => {
    await dbHandler.connect();
});

afterEach(async() => {
    await dbHandler.clear();
});

afterAll(async () => {
    await dbHandler.disconnect();
});
export const userPro = {
    _id: Id,
    firstName:"abcabc",
    lastName: "abcabc",
    email: "abcabc@gmail.com",
    phoneNumber: "0909090909",
  };
// const agent = request.agent(app);

// describe("user profile crud", () => {
//     it("return 200 status ", async () => {
//         const users = await getUserProfile();
//         // const {body, statusCode} = await supertest(app).get()
//         expect(statusCode).toBe(200);
//     })
// })


