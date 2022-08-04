import {connect, clear, disconnect}  from '../setupdb';
import app from '../../app';
import request from 'supertest';
import { Article } from '../../models/article';
import { UserProfile } from '../../models/UserProfile';
import mongoose from 'mongoose';
// import setupdb from '../../setupdb'

jest.setTimeout(10000);

let userID = new mongoose.Types.ObjectId().toString();
let firstProfile = {
            _id : userID,
            username: "sdcfggh",
            name: "jane.doe@example.com",
            bio: "Jane Doe",
            phone: "+25143674477"
        }
describe('/api/articles', () => {
    beforeAll(async () => {
        await connect();
    });
    afterAll(async () => { 
        await clear();
        await disconnect();
     });

    describe('GET /', () => {
        it('should return all articles', async () => {
            await UserProfile.create(firstProfile);
            await Article.collection.insertMany([{
                author: firstProfile._id, 
                content: 'Born and raised in the small town of hidaro, I was..',
                rating: 4
            }, {
                author: firstProfile._id,
                content: 'Born and raised in the small town of hidaro, I was..',
                rating: 2
            }]);
            const res = await request(app).get('/api/articles');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            res.body.forEach((article: any) => {
                expect(article).toMatchObject({
                    author: firstProfile
                })
            });
        });
    });

    describe('GET /:id',  () => {
        it('should return an Article if vald ID is passed', async() => {
            const article = await Article.create({
                author: userID, content: 'Born and raised in the small town of hidaro I was..',
                rating: 4
            });

            const res = await request(app).get('/api/articles/' + article._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('rating', article.rating);
            expect(res.body).toHaveProperty('content', article.content);
            expect(res.body.author).toMatchObject(firstProfile);

        });

        it ('should return 404 if invalid ID is passed', async () => {
            const res = await request(app).get('/api/articles/1');

            expect(res.status).toBe(404);
            
        });
    });

    describe('POST /', () => {
        jest.setTimeout(30000)
        it('should return an article with the passed body', async() => {
            const res = await request(app)
                .post('/api/articles')
                .send({
                    author: firstProfile._id, content: 'Born and raised in the small town of hidaro I was..',
                    rating: 4
                });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('author', userID);

        });
        
        it ('should return a 400 if invalid input is passed as a body', async () => {
            const res = await request(app)
                .post('/api/articles')
                .send({name: 'Bro'});

            expect(res.status).toBe(400);
        });
    });

    describe('PUT /', () => {
        jest.setTimeout(30000);
        it('should update a document with the given ID', async() => {
            const article = await Article.create({
                author: userID, content: 'Born and raised in the small town of hidaro I was..',
                rating: 4
            });
            const res = await request(app)
                .put('/api/articles/' + article._id)
                .send({author: userID, content: 'Born and raised in the small town of hidaro I was..',
                rating: 4});

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('author', userID);
        });

        it('should return a 400 if invalid input is passed as a body', async() => {
            const article = await Article.create({
                author: userID, content: 'Born and raised in the small town of hidaro I was..',
                rating: 4
            });
            const res = await request(app)
                .put('/api/articles/' + article._id)
                .send({author: new mongoose.Types.ObjectId().toString(), content: 'Born.',
                rating: 4});

            expect(res.status).toBe(400);
        });

        it('should return a 404 if invalid ID is passed', async () => {
            const res = await request(app)
                .put('/api/articles/' + new mongoose.Types.ObjectId().toString());
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /', () => {
        it('should delete a document with a given ID', async() => {
            const article = new Article({
                author: userID, content: 'Born and raised in the small town of hidaro I was..',
                rating: 4
            });
            await article.save();
            const res = await request(app)
                .delete('/api/articles/' + article._id);
            
            expect(res.status).toBe(200);
            const res2 = await request(app)
                .get('/api/articles/' + article._id);
            expect(res2.status).toBe(404);
        });

        it('should return 404 if invalid ID is passed', async() => {
            const res = await request(app)
                .delete('/api/articles/' + new mongoose.Types.ObjectId().toString());
            expect(res.status).toBe(404);
        });
    });


    
});
afterAll( async () => await disconnect());