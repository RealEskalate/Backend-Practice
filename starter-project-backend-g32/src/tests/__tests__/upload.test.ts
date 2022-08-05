import Article from '../../models/article'
import User from '../../models/user.models'
import request from 'supertest'
import {connect, disconnect, clear} from '../setupdb'
import app from '../../app'

let articleID = ''
let userID = ''
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

    const user = {
        firstName: "John",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: "johnDoe",
        profilePic: "linkToProfile",
    }
    const newUser = new User(user)
    await newUser.save()
    userID = newUser._id
    
})

afterAll(async () => {
    await disconnect()
},100000)

afterEach(async () => {
    await clear()
})

describe('Integration testing for upload routes', () => {

    it('Fails to upload article file', async () => {
        const {body,statusCode} = await request(app).put(`/api/v1/upload/articleMedia/${articleID}`).send({})
        expect(statusCode).toBe(400)
    })
    
    it('Fails to delete article file',async () => {
        const {body,statusCode} = await request(app).delete(`/api/v1/upload/articlMedia/fakeId`)
        expect(statusCode).toBe(404)
    })
    it('Fails to upload user profile', async () => {
        const {body,statusCode} = await request(app).put(`/api/v1/upload/userProfile/${userID}`).send({})
        expect(statusCode).toBe(400)
    })
    
    it('Fails to delete user profile',async () => {
        const {body,statusCode} = await request(app).delete(`/api/v1/upload/userProfile/fakeId`)
        expect(statusCode).toBe(404)
    })
})