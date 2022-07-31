
import {connect, disconnect, clear} from '../setupdb';
import app from "../../app";
import { createConnection } from 'net';
import { response } from 'express';
jest.setTimeout(10000);
const Article = require("../../models/ArticleModel");
const request = require('supertest')(app);

beforeEach(async () => {
    await connect();
});

afterEach(async() =>{
    await clear();
    await disconnect(); 
});

describe("GET /", () => {
    it("should return ...", async () => {
        await Article.collection.insertMany([{
            Author : "Abebe",
            Content : "this is the content",
            Rating : 4
        },
        {
            Author : "kebede",
            Content : "this is another content",
            Rating : 3
        }]);
        const result = await request.get('/api/articles');
        expect(result.body.length).toBe(2);
        expect(result.status).toBe(200);
    })
});

describe("GET BY ID /", () => {
    it("should return one article ", async () => {
        const article = new Article({
            Author : "Abebe",
            Content : "this is the secondfgvybuhnijmok content",
            Rating : 4
        });
        await article.save();
        const result = await request.get(`/api/articles/${article.id}`);
        expect(result.body).toHaveProperty('Author', 'Abebe');
        expect(result.status).toBe(200);
    })
    it('should return status 404', async () => {
        const result = await request.get('/api/articles/5');
        expect(result.status).toBe(400);
    })
})

describe("createArticle /", () => {
    it("should return one article ", async () => {
        const article = await request.post('/api/articles').send({
            Author : "Abebe",
            Content : "this is the secondfgvybuhnijmok content",
            Rating : 4
        });
        expect(article.body).toHaveProperty('Author', 'Abebe');
        expect(article.status).toBe(200);
    })
    it('should return an error', async () => {
        const article = await request.post('/api/articles').send({
            Author : "Abebe",
            Content : "this is the ",
            Rating : 4
        });

        expect(article.status).toBe(400);
    })
})

describe('Delete One ..', () => {
    it('should return true', async () => {
        const article = new Article({
            Author : "Abebe",
            Content : "this is the secondfgvybuhnijmok content",
            Rating : 4
        });
        await article.save();
        const id = article.id;

        const res = await request.delete(`/api/articles/${id}`);
        const res2 = await request.get(`/api/articles/${id}`);

        expect(res2.status).toBe(404);
        expect(res.status).toBe(200);

    });
});

describe('Update One ...', () => {
    it("should be correct ", async () => {
        const article = new Article({
            Author : "Abebe",
            Content : "this is the secondfgvybuhnijmok content",
            Rating : 4
        });
        await article.save();
        const id = article.id;

        const res = await request.put(`/api/articles/${id}`).send({
            Author : 'Fitsum',
            Rating : 2
        });
        expect(res.body).toHaveProperty('Author', 'Fitsum');
    });
});
