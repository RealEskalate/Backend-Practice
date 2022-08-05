import model from '../../models/user.models';
import mongoose from 'mongoose';
import request from 'supertest'
import express from 'express'
import {connect, disconnect, clear} from '../setupdb'
import router from '../../routes/user';

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
    const newUser = new model(userSchema)
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
app.use('/api/v1/userProfile',router)

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
        const {body,statusCode} = await request(app).post('/api/v1/userProfile').send(
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
        const {body, statusCode} = await request(app).get(`/api/v1/userProfile/`)
        expect(body).toEqual(
        expect.objectContaining({
            "data": expect.arrayContaining([
                    expect.objectContaining({
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        email: expect.any(String),
                        profilePic: expect.any(String),
                    })
            ])
        })
            )
        expect(statusCode).toBe(200);
    });
    it('Get a User', async () => {
        const {body,statusCode} = await request(app).get(`/api/v1/userProfile/${userId}`)
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })
    
    it('Fail to get a User', async () => {
        const {body,statusCode} = await request(app).get(`/api/v1/userProfile/nonexisting_id`)
        expect(body).toStrictEqual({})
        expect(statusCode).toBe(404 || 500)
    })

    it('Delete a User', async () => {
        const {body,statusCode} = await request(app).delete(`/api/v1/userProfile/${userId}`)
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it('Failed to delete a User', async () => {
        const {body,statusCode} = await request(app).delete(`/api/v1/userProfile/nonexisting_id`)
        expect(body).toStrictEqual({})
        expect(statusCode).toBe(500)
    })

    it('Update a User', async () => {
        const {body,statusCode} = await request(app).put(`/api/v1/userProfile/${userId}`).send({
            firstName: "John",
            lastName: "Doe",
            email: "JohnDoe@gmail.com",
            profilePic: "linkToNewProfilePic"
        })
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it('Fail to update a User', async () => {
        const {body,statusCode} = await request(app).put(`/api/v1/userProfile/nonexisting_id`).send({})
        expect(body).toStrictEqual({})
        expect(statusCode).toBe(500)
    })

})