import Article from '../../models/article'
import request from 'supertest'
import mongoose from 'mongoose'
import {connect, disconnect, clear} from '../setupdb'
import app from '../../app'

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

describe('Integration testing for upload routes', () => {

    it('Fails to upload file', async () => {
        const {body,statusCode} = await request(app).put(`/api/v1/upload/articleMedia/${articleID}`).send({})
        expect(statusCode).toBe(400)
    })
    
    it('Fails to delete file',async () => {
        const {body,statusCode} = await request(app).delete(`/api/v1/upload/articlMedia/fakeId`)
        expect(statusCode).toBe(404)
    })

})