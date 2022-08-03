import userProfileModel from '../../models/UserProfile';
import app from '../../app';
import mongoose from 'mongoose';
import request from 'supertest'
import { connect, disconnect, clear } from '../setupdb'

let userProfileID: any;
const agent = request.agent(app);
jest.setTimeout(30000);


beforeAll(async () => {
    await connect();
    const userSchema = {
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        profilePicture: "profilepicture"
    }
    const newUser = await userProfileModel.create(userSchema);
    userProfileID = newUser._id
});

afterAll(async () => {
    await clear();
    await disconnect();
}, 100000);



describe("POST /userProfiles", () => {
    it("create new user", async () => {
        const { body, statusCode } = await agent.post("/userProfiles/").send(
            {
                firstName: "John",
                lastName: "Doe",
                gender: "Male",
                profilePicture: "profilepicture"
            }
        );
        expect(statusCode).toBe(201);
    })

    it("will fail to create new user because gender is expected", async () => {
        const { body, statusCode } = await agent.post("/userProfiles/").send(
            {
                firstName: "John",
                lastName: "Doe",
                profilePicture: "profilepicture"
            }
        );
        expect(statusCode).toBe(400);
    });


})

describe('GET /userProfiles', () => {
    it('gets all users', async () => {
        const res = await agent
            .get(`/userProfiles/`)
            .send()
        expect(res.statusCode).toEqual(200)
    })

})

describe('GET /userProfiles/:userID', () => {
    it('gets single user', async () => {
        const res = await agent
            .get(`/userProfiles/${userProfileID}/`)
            .send()
        expect(res.statusCode).toEqual(200)
    })
    it('will fail to get user because user doesn\'t exist', async () => {
        const res = await agent
            .get(`/userProfiles/${new mongoose.Types.ObjectId()}/`)
            .send()
        expect(res.statusCode).toEqual(404)
    })

})

describe('UPDATE /userProfiles/:userID', () => {
    it('update single user', async () => {
        const res = await agent
            .put(`/userProfiles/${userProfileID}/`)
            .send({
                firstName: "Jane",
                gender: "Female"
            })
        expect(res.statusCode).toEqual(200)
    })
    it('will fail to update user because user doesn\'t exist', async () => {
        const res = await agent
            .put(`/userProfiles/${new mongoose.Types.ObjectId()}/`)
            .send({
                firstName: "Jane",
                gender: "Female"
            })
        expect(res.statusCode).toEqual(404)
    })

})

describe('DELETE /userProfiles/:userID', () => {
    it('delete single user', async () => {
        const res = await agent
            .delete(`/userProfiles/${userProfileID}/`)
            .send()
        expect(res.statusCode).toEqual(200)
    })
    it('will fail to delete user because user doesn\'t exist', async () => {
        const res = await agent
            .delete(`/userProfiles/${new mongoose.Types.ObjectId()}/`)
            .send()
        expect(res.statusCode).toEqual(404)
    })

})