import model from '../../models/user.models';
import mongoose from 'mongoose';
import request from 'supertest'
import router from '../../routes/user.routes'
import express from 'express'
import {connect, disconnect, clear} from '../setupdb'

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
    const newUser = new model(userSchema)
    await newUser.save()
})

afterAll(async () => {
    await disconnect();
},100000);

afterEach(async () => {
    await clear();
});

app.use(express.json());
app.use('/userProfile',router)

describe("Integration testing for user routes", () => {

    it("should fail to create a user", async () => {
        let user = {}
        try{
            const newUser = new model(user);
            await newUser.save();
        }catch(error){
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
        }
    })

    it("Post user request", async () => {
        const {body,statusCode} = await request(app).post("/userProfile").send(
        {
            firstName: "John",
            lastName: "Doe",
            email: "johnDoe@gmail.com",
            password: "johnDoe",
        }
        )
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it("Get all request ", async() => {
        const {body, statusCode} = await request(app).get("/userProfile")
        expect(body).toEqual(
        expect.objectContaining({
            "data": expect.arrayContaining([
                    expect.objectContaining({
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        email: expect.any(String),
                        password: expect.any(String),
                        profilePic: expect.any(String),
                    })
            ])
        })
            )
        expect(statusCode).toBe(200);
    })

})