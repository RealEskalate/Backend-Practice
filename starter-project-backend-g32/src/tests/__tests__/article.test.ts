import User from '../../models/article'
import request from 'supertest'
import mongoose from 'mongoose'
import router from '../../routes/article'
import express from 'express'
import {connect, disconnect, clear} from '../setupdb'

const app = express()

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {

    const article = {
        author: "shakespeer",
        content: "julet I love you so much. Have no word to explain."
    }
    const newArticle = new User(article)
    await newArticle.save()
    console.log(newArticle)
})

afterAll(async () => {
    await disconnect();
},100000);

afterEach(async () => {
    await clear();
});

app.use(express.json());
app.use('/articles',router)

describe("Integration testing for user routes", () => {

    it("should fail to create a user", async () => {
        let user = {}
        try{
            const newUser = new User(user);
            await newUser.save();
        }catch(error){
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
        }
    })

    it("Post article request", async () => {
        const {body,statusCode} = await request(app).post("/articles").send(
        {
            author: "Addis Alemayehu",
            content: "Bezabih and Seblewengew used to meet around debretabor.",
            media: "lksdjf",
        }
        )
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(201)
    })

    it("Get all request ", async() => {
        const {body, statusCode} = await request(app).get("/articles")
        expect(body).toEqual(
        expect.objectContaining({
            "data": expect.arrayContaining([
                    expect.objectContaining({
                        author: expect.any(String),
                        content: expect.any(String),
                        media: expect.any(String),
                    })
            ])
        })
            )
        expect(statusCode).toBe(200);
    })

})