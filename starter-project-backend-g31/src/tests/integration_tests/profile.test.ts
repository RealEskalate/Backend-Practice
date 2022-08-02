var request = require('supertest');
import app from '../../app';
import { connect, clear, disconnect } from '../setupdb';
import { create, _delete } from '../../services/profileService';
import mongoose from 'mongoose';


jest.setTimeout(10000);


describe('user-profile API', () => {
    beforeAll(async () => {
        await connect();
    })
    beforeEach(async () => {
        await clear();
    })
    afterAll(async () => {
        await clear();
        disconnect();
    })

    describe('GET /api/user-profile', () => {
        it('should find the list of user profiles', async () => {
            try {
                return await request(app).get('/api/user-profile')
                    .accept('Accept', 'application/json')
                    .expect('Content-Type', '/json/')
                    .expect(200);
            } catch (err) {
                return err;
            }
        });
        it('should return a 404 error', async () => {
            try {
                return await request(app).get('/api/user-profiles')
                    .accept('Accept', 'application/json')
                    .expect(404);
            } catch (err) {
                return err;
            }
        })
    })

    describe('GET /api/user-profile/:id', () => {
        it('should return a 400 error because the profile does not exist', async () => {
                const { body, statusCode, status } = await request(app).get(`/api/user-profile/${new mongoose.Types.ObjectId()}`)
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8");
            
            
            expect(statusCode).toBe(400);
        })
        it('should find the user-profile provided that the it exists', async () => {
            const profileData = {
                    username: "hello",
                    fullname: "mate",
                    bio: "this is a bio",
                    phone: "0994437084",
            }
            const profile = await create(profileData);
            const { body, statusCode, status } = await request(app).get(`/api/user-profile/${profile._id}`)
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8");
            
            
            expect(statusCode).toBe(200);    
            expect(body).toMatchObject(profileData);
        });
    })

    describe('POST /api/user-profile', () => {
        it('should create the user-profile', async () => {
            const profileData = {
                    username: "hello2",
                    fullname: "mate2",
                    bio: "this is a bio2",
                    phone: "0994437084",
            }
            const { body, status } = await request(app).post(`/api/user-profile`)
                .send(profileData)
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8");
            
            expect(status).toBe(201); 
            expect(body).toMatchObject(profileData);
        });
        it('should return an error because username is not specified', async () => {
            const profileData = {
                    fullname: "mate2",
                    bio: "this is a bio2",
                    phone: "0994437084",
            }
            const { body, status } = await request(app).post(`/api/user-profile`)
                .send(profileData)
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8");
            
            expect(status).toBe(400);
        });
        it('should return a 400 error because the profile already exists', async () => {
                const profileData = {
                        username: "hello2",
                        fullname: "mate2",
                        bio: "this is a bio2",
                        phone: "0994437084",
                }
            const profile = await create(profileData);
            const profileData2 = {
                        username: profileData.username,
                        fullname: "fullname",
                        bio: "this is updated bio",
                        phone: "0994437090",
                }
            const { body, status } = await request(app).post(`/api/user-profile`)
                .send(profileData2)
                .accept('Accept', 'application/json')
                    .expect('Content-Type', "application/json; charset=utf-8");
                expect(status).toBe(400);
        })
    })

    describe('Delete /api/user-profile/:id', () => {
        it('should return a 400 error', async () => {
            const { status } = await request(app).delete(`/api/user-profile/${23}`)
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8");
            
            
            expect(status).toBe(400);
        });

        it('should delete the user-profile provided that the it exists', async () => {
            const profileData = {
                    username: "hello",
                    fullname: "mate",
                    bio: "this is a bio",
                    phone: "0994437084",
            }
            const profile = await create(profileData);
            const { body,status } = await request(app).delete(`/api/user-profile/${profile._id}`)
                .accept('Accept', 'application/json');
            
            
            
            expect(status).toBe(204);
        });
    })

    describe('PATCH /api/user-profile/:id', () => {
        it('should return a 400 error because the profile does not exist', async () => {
                const { body, statusCode, status } = await request(app).patch(`/api/user-profile/${23}`)
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8");
            
            
            expect(statusCode).toBe(400);
        })
        it('should find the user-profile provided that the it exists and then delete it', async () => {
            const profileData = {
                    username: "hello",
                    fullname: "mate",
                    bio: "this is a bio",
                    phone: "0994437084",
            }
            const updatedProfile = {
                    username: "herr",
                    fullname: "mon",
                    bio: "this is a bio5",
                    phone: "0994437089",
            }
            const profile = await create(profileData);
            const { body, statusCode, status } = await request(app).patch(`/api/user-profile/${profile._id}`)
                .send(updatedProfile)
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8");
            
            
            expect(statusCode).toBe(200);    
            expect(body).toMatchObject(updatedProfile);
        });
    })
})