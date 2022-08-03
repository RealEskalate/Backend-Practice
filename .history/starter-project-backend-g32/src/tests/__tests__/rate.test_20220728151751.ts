import request from 'supertest';
import app from '../../app';

describe('POST /users/:userID/posts/:postID/rates', () => {
    it('should return a 201 response', async () => {
        const response = await request(app)
        .post('/users/5e9f8f8f8f8f8f8f8f8f8f8/posts/5e9f8f8f8f8f8f8f8f8f8f8/rates')
        .send({
            rate: 5,
        });
        expect(response.status).To(201);
    })
})