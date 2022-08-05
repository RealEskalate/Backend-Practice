import User from '../../models/user.models';
import mongoose from 'mongoose';
import request from 'supertest'
import authRouter from '../../routes/auth.routes';
import express from 'express'
import {connect, disconnect, clear} from '../setupdb'

let userId = ''

const app = express()

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {

    const userSchema = {
        firstName: "John",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: "johnDoe",
        profilePic: "linkToProfile",
    }
    const newUser = new User(userSchema)
    await newUser.save()

    userId = newUser._id;
})

afterAll(async () => {
    await disconnect();
},100000);

afterEach(async () => {
    await clear();
});

app.use(express.json());
app.use('/api/v1/auth',authRouter);

describe("Integration testing for authentication routes", () => {

  
    it("should register user", async () => {
        const {body,statusCode} = await request(app).post('/api/v1/auth/signup').send(
        {
            firstName: "John2",
            lastName: "Doe2",
            email: "john2Doe2@gmail.com",
            password: "johnDoe",
            profile : "linkToProfile"
        }
        )
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it("should fail to register user", async () => {
        const {body,statusCode} = await request(app).post('/api/v1/auth/signup').send(
        {
            firstName: "John2",
            lastName: "Doe2",
            email: "",
            password: "johnDoe",
            profile : "linkToProfile"
        }
        )
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(404)
    }
    )

    

})