import Article from '../../models/article'
import UserModel from '../../models/user.models'
import request from 'supertest'
import mongoose from 'mongoose'
import router from '../../routes/article'
import express from 'express'
import { connect, disconnect, clear } from '../setupdb'

const app = express()
let articleID = ''
let userID: any;

beforeAll(async () => {
    await connect()

    const userSchema = {
        firstName: "John",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: "johnDoe",
        profilePic: "linkToProfile",
    }
    const newUser = new UserModel(userSchema)
    await newUser.save()

    userID = newUser._id;

    const article = {
        userID: userID,
        author: 'shakespeer',
        content: 'juliet I love you so much. I have no word to explain.'
    }
    const newArticle = new Article(article)
    await newArticle.save()
    articleID = newArticle._id
})

afterAll(async () => {
    await clear()
    await disconnect()
}, 100000)


app.use(express.json())
app.use('/api/v1/articles', router)

describe('Integration testing for user routes', () => {

    it('Fails to create an article', async () => {
        let user = {}
        try {
            const newUser = new Article(user)
            await newUser.save()
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
        }
    })

    it('Post an article', async () => {
        const { body, statusCode } = await request(app).post("/api/v1/articles").send({
            userID: userID,
            author: 'Addis Alemayehu',
            content: 'Bezabih and Seblewengew used to meet around debretabor.',
            media: 'lksdjf',
        })
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(201)
    })

    it('fails to post an article because user doesnt exist', async () => {
        const { body, statusCode } = await request(app).post("/api/v1/articles").send({
            userID: new mongoose.Types.ObjectId(),
            author: 'Addis Alemayehu',
            content: 'Bezabih and Seblewengew used to meet around debretabor.',
            media: 'lksdjf',
        })
        expect(statusCode).toBe(404)
    })

    it('Get an article', async () => {
        const { body, statusCode } = await request(app).get(`/api/v1/articles/${articleID}`)
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it('Fail to get an article', async () => {
        const { body, statusCode } = await request(app).get(`/api/v1/articles/nonearticleid`)
        expect(body).toStrictEqual({})
        expect(statusCode).toBe(500)
    })


    it('Update an article', async () => {
        const { body, statusCode } = await request(app).put(`/api/v1/articles/${articleID}`).send({
            author: 'Addis Alemayehu',
            content: 'Bezabih and Seblewengew used to meet around debretabor.',
            media: 'lksdjf',
        })
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it('Fail to update an article', async () => {
        const { body, statusCode } = await request(app).put(`/api/v1/articles/nonearticleid`).send({})
        expect(body).toStrictEqual({})
        expect(statusCode).toBe(500)
    })

    it('Get all articles', async () => {
        const { body, statusCode } = await request(app).get('/api/v1/articles')
        expect(body).toEqual(
            expect.objectContaining({
                'data': expect.arrayContaining([
                    expect.objectContaining({
                        userID: expect.any(String),
                        author: expect.any(String),
                        content: expect.any(String),
                        media: expect.any(String),
                    })
                ])
            })
        )
        expect(statusCode).toBe(200);
    })

    it('Delete an article', async () => {
        const { body, statusCode } = await request(app).delete(`/api/v1/articles/${articleID}`)
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

})