import {connect, clear, disconnect}  from '../setupdb';
import app from '../../app';
import request from 'supertest';
const Article = require('../../models/ArticleModel');
// import setupdb from '../../setupdb'

// jest.setTimeout(100000);

describe('/api/articles', () => {
    beforeEach(async () => {
        await connect();
    });
    afterEach(async () => { await clear(); });
    afterEach(async () => { await disconnect(); })

    describe('GET /', () => {
        it ('should return all articles', async() => {
            await Article.collection.insertMany([{
                Author: 'Brook Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                Rating: 4
            }, {
                Author: 'Mahlet Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                Rating: 2
            }]);
            const res = await request(app).get('/api/articles');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some((A: any) => A.Author === 'Brook Zewdu')).toBeTruthy();
            expect(res.body.some((A: any) => A.Author === 'Mahlet Zewdu')).toBeTruthy();
        });
    });

    describe('GET /:id',  () => {
        it('should return an Article if vald ID is passed', async() => {
            const article = new Article({
                Author: 'Brook Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                Rating: 4
            });
            await article.save();

            const res = await request(app).get('/api/articles/' + article._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('Author', article.Author);

        });

        it ('should return 404 if invalid ID is passed', async () => {
            const res = await request(app).get('/api/articles/1');

            expect(res.status).toBe(404);
            
        });
    });

    describe('POST /', () => {
        it('should return an article with the passed body', async() => {
            const res = await request(app)
                .post('/api/articles')
                .send({
                    Author: 'Brook Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                    Rating: 4
                });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('Author', 'Brook Zewdu');

        });
        
        it ('should return a 400 if invalid input is passed as a body', async () => {
            const res = await request(app)
                .post('/api/articles')
                .send({name: 'Bro'});

            expect(res.status).toBe(400);
        });
    });

    describe('PUT /', () => {
        it('should update a document with the given ID', async() => {
            const article = new Article({
                Author: 'Brook Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                Rating: 4
            });
            await article.save();
            const res = await request(app)
                .put('/api/articles/' + article._id)
                .send({Author: 'Dagim Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                Rating: 4});

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('Author', 'Dagim Zewdu');
        });

        it('should return a 400 if invalid input is passed as a body', async() => {
            const article = new Article({
                Author: 'Brook Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                Rating: 4
            });
            await article.save();
            const res = await request(app)
                .put('/api/articles/' + article._id)
                .send({Author: 'Dagim Zewdu', Content: 'Born.',
                Rating: 4});

            expect(res.status).toBe(400);
        });

        it('should return a 404 if invalid ID is passed', async () => {
            const res = await request(app)
                .put('/api/articles/1');
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /', () => {
        it('should delete a document with a given ID', async() => {
            const article = new Article({
                Author: 'Brook Zewdu', Content: 'Born and raised in the small town of hidaro I was..',
                Rating: 4
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
                .delete('/api/articles/1');
            expect(res.status).toBe(404);
        });
    });


    
});