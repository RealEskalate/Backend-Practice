import {connect , clear, disconnect} from  '../setupdb';
import app from '../../app';
import Comment from '../../models/comment';
import supertest  from 'supertest';
import Article  from '../../models/article';
import mongoose from 'mongoose';



const request = supertest(app);
jest.setTimeout(30000);
let commentId : String;
let articleId : mongoose.Types.ObjectId;

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await Article.create({
        author: "asfdadfs",
        content: "asdfadfasdf",
        media: "asdfasfdfa"
    }).then((article)=>{
        articleId = article._id;
    })
    await Comment.create({
        articleId: articleId,
        content: 'test comment',
        createdAt: new Date()
    }).then((result: any) => {
        commentId = result._id;
    }
    );



});

afterEach(async () => {
    await clear();
});

afterAll(async () => {
    await disconnect();
});

describe('Test for comment', () => {
    it('should create a comment', async () => {

        
        const response = await request.post('/api/v1/comment').send({
            articleId: articleId,
            content: 'This is a test comment',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Comment added successfully');
    })


    it('shouldn\'t create a comment without article', async () => {
        const response = await request.post('/api/v1/comment').send({
            content: 'This is a test comment',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })


    it('shouldn\'t create a comment without content', async () => {
        const response = await request.post('/api/v1/comment').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })


    it('should get a comment', async () => {
        const response = await request.get('/api/v1/comment/' + commentId);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('test comment');
    })

    it('shouldn\'t get a comment with invalid id', async () => {
        const response = await request.get('/api/v1/comment/' + 'invalid id');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }
    )

    it('should get all comments', async () => {
        const response = await request.get('/api/v1/comment');
        expect(response.body.length).toBe( 1)
        expect(response.status).toBe(200);
    })

    it('should delete a comment', async () => {
        const response = await request.delete('/api/v1/comment/${commentId}');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Comment deleted successfully');
    })

    it('shouldn\'t delete a comment with invalid id', async () => {
        const response = await request.delete('/api/v1/comment/' + 'invalid id');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }
    )

    it('should update a comment', async () => {
        const response = await request.put('/api/v1/comment/${commentId}').send({
            content: 'This is an updated test comment',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Comment updated successfully');
    })

    it('shouldn\'t update a comment with invalid id', async () => {
        const response = await request.put('/api/v1/comment/' + 'invalid id').send({
            content: 'This is an updated test comment',
        });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }
    )

    it('shouldn\'t update a comment without content', async () => {
        const response = await request.put('/api/v1/comment/${commentId}').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    }
    )

    it('should patch a comment', async () => {
        const response = await request.patch('/api/v1/comment/' + commentId).send({
            "content" : 'This is an updated test comment',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Comment updated successfully');
    })

    it('shouldn\'t patch a comment with invalid id', async () => {
        const response = await request.patch('/api/v1/comment/' + 'invalid id').send({
            content: 'This is an updated test comment',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })

    
})
