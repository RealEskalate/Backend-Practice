import Article from '../../models/article'
import request from 'supertest'
import mongoose from 'mongoose'
import router from '../../routes/article'
import express from 'express'
import {connect, disconnect, clear} from '../setupdb'

const app = express()
let articleID = ''

beforeAll(async () => {
    await connect()
})

beforeEach(async () => {
    const article = {
        author: 'shakespeer',
        content: 'julet I love you so much. I have no word to explain.'
    }
    const newArticle = new Article(article)
    await newArticle.save()
    articleID = newArticle._id
})

afterAll(async () => {
    await disconnect()
},100000)

afterEach(async () => {
    await clear()
})

app.use(express.json())
app.use('/api/v1/articles',router)

describe('Integration testing for user routes', () => {

    it('Fails to create an article', async () => {
        let user = {}
        try{
            const newUser = new Article(user)
            await newUser.save()
        }catch(error){
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
        }
    })

    it('Post an article', async () => {
        const {body,statusCode} = await request(app).post("/api/v1/articles").send({
            author: 'Addis Alemayehu',
            content: 'Bezabih and Seblewengew used to meet around debretabor.',
            media: 'lksdjf',
        })
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(201)
    })

    it('Get an article', async () => {
        const {body,statusCode} = await request(app).get(`/api/v1/articles/${articleID}`)
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })
    
    it('Fail to get an article', async () => {
        const {body,statusCode} = await request(app).get(`/api/v1/articles/nonearticleid`)
        expect(body).toStrictEqual({})
        expect(statusCode).toBe(500)
    })

    it('Delete an article', async () => {
        const {body,statusCode} = await request(app).delete(`/api/v1/articles/${articleID}`)
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it('Update an article', async () => {
        const {body,statusCode} = await request(app).put(`/api/v1/articles/${articleID}`).send({
            author: 'Addis Alemayehu',
            content: 'Bezabih and Seblewengew used to meet around debretabor.',
            media: 'lksdjf',
        })
        expect(body).not.toBeFalsy()
        expect(statusCode).toBe(200)
    })

    it('Fail to update an article', async () => {
        const {body,statusCode} = await request(app).put(`/api/v1/articles/nonearticleid`).send({})
        expect(body).toStrictEqual({})
        expect(statusCode).toBe(500)
    })

    it('Get all articles', async() => {
        const {body, statusCode} = await request(app).get('/api/v1/articles')
        expect(body).toEqual(
        expect.objectContaining({
            'data':expect.objectContaining({
                    number_of_articles:expect.any(Number),
                    articles: expect.arrayContaining([
                        expect.objectContaining({
                            author: expect.any(String),
                            content: expect.any(String),
                            media: expect.any(String),
                        })
                    ])
                }) 
            })
        )
        expect(statusCode).toBe(200);
    })

})