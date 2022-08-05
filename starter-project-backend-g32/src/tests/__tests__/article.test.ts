import Article from '../../models/article'
import request from 'supertest'
import mongoose from 'mongoose'
import router from '../../routes/article'
import express from 'express'
import {connect, disconnect, clear} from '../setupdb'
import Rating from '../../models/rating'

const app = express()
let articleID = ''
let ratingId = ''
let userId = ''


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

    userId = String(mongoose.Types.ObjectId());
    const rating = {
        "stars": 5,
        "articleId": articleID,
        "userId": userId,
    }

    const newRating = new Rating(rating)
    await newRating.save()
    ratingId = newRating._id
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

});


//Rating Tests
describe('Rating Tests', ()=> {
    describe('GET: rating routes', ()=>{
        describe('given the ratingId does not exist: ', () => {
            it('should return a 404.', async () => {
                const wrongRatingId = new mongoose.Types.ObjectId();
                await request(app).get(`/api/v1/articles/${articleID}/${wrongRatingId}`).expect(404);
            });
        });

        describe('given the RatingId does exist', () => {
            it('should return a 200 and the rating info.', async () => {
                //lets create rating model object first to be sure there exists one in our db
                const testUserId = String(mongoose.Types.ObjectId());
                const rating = {
                    "stars": 5,
                    "userId": testUserId,
                }
                const {body, statusCode } = await request(app).post(`/api/v1/articles/${articleID}/rating`).send(rating).expect(201);
                const data = body.data;
                const testRatingId = data._id
                await request(app).get(`/api/v1/articles/${articleID}/rating/${testRatingId}`).expect(200);
            });
        });

        describe('given the ArticleId does not exist', () => {
            it('should return a 404.', async () => {
                const wrongArticleId = new mongoose.Types.ObjectId();
                await request(app).get(`/api/v1/articles/${wrongArticleId}/${ratingId}`).expect(404);
            });
        });
    });

    describe('POST rating routes', ()=>{
        describe('given the rating body is passed correctly', () => {
            it('should return a 201 and create the rating.', async () => {
                //lets create rating model object first
                const testUserId = String(mongoose.Types.ObjectId());
                const rating = {
                    "stars": 5,
                    "userId": testUserId,
                }
                const {body, statusCode } = await request(app).post(`/api/v1/articles/${articleID}/rating`).send(rating);
                expect(statusCode).toBe(201);
                expect(body).not.toBeFalsy()

            });
        });
        describe('given the rating body is passed incorrectly', () => {
            it('should return a 400.', async () => {
                const testUserId = String(mongoose.Types.ObjectId());
                const wrongRating = {
                    "stars": 5,
                    "articleId": articleID
                }
                await request(app).post(`/api/v1/articles/${articleID}/rating`).send(wrongRating).expect(400);
            });
        });
    });

    describe('PUT rating routes', ()=>{
        describe('given the rating update body is passed correctly', () => {
            it('should return a 200 and Update the rating.', async () => {
                //lets create rating model object first
                const testUserId = String(mongoose.Types.ObjectId());
                const rating = {
                    "stars": 5,
                    "userId": testUserId,
                }
                const {body, statusCode } = await request(app).post(`/api/v1/articles/${articleID}/rating`).send(rating);
                expect(statusCode).toBe(201);
                expect(body).not.toBeFalsy();

                const data = body.data;
                const testRatingId = data._id

                const ratingUpdate = {
                    "stars": 5
                }

                await request(app).put(`/api/v1/articles/${articleID}/rating/${testRatingId}`).send(ratingUpdate).expect(200);
            });
        });
        describe('given the rating update body is passed incorrectly', () => {
            it('should return a 400.', async () => {
                const testUserId = String(mongoose.Types.ObjectId());
                const rating = {
                    "stars": 5,
                    "userId": testUserId,
                }
                const {body, statusCode } = await request(app).post(`/api/v1/articles/${articleID}/rating`).send(rating);
                expect(statusCode).toBe(201);
                expect(body).not.toBeFalsy();

                const data = body.data;
                const testRatingId = data._id

                const wrongRatingUpdate = {}

                await request(app).put(`/api/v1/articles/${articleID}/rating/${testRatingId}`).send(wrongRatingUpdate).expect(400);
            });
        });
    });
});
