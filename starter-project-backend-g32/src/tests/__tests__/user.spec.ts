
var supertest = require('supertest');

import app from '../../app';
import { User } from '../../models/User.model';
import { connect, clear, disconnect } from '../setupdb';

describe('Users Model test', () => {
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

    describe('GET /api/v1/users', () => {
        it('should find users from database', async () => {
            
            return await supertest(app).get('/api/v1/users')
                .accept('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(200);
        });
      
    })
    describe('GET /api/username/:username and /api/userId/:id' , () => {
    

        it("should find user by given username" , async () => {
            const sample = {"password": "hisPassword", "username": "Abebe"}
            var user = await User.create(sample);
          
            user.createdAt = user.createdAt.toString();
            user.updatedAt = user.updatedAt.toString();
            const { body , statusCode } = await supertest(app).get('/api/v1/users/username/' + sample.username)
            .accept('Accept', 'application/json')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200);
       
            expect(body).toMatchObject(sample);
        })

        it("should find user by given Id" , async () => {
            const sample = {"password": "hisPassword", "username": "Abebebeso"}
            var user = await User.create(sample);
          
            user.createdAt = user.createdAt.toString();
            user.updatedAt = user.updatedAt.toString();
            const { body , statusCode } = await supertest(app).get('/api/v1/users/userId/' + user._id)
            .accept('Accept', 'application/json')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200);
       
            expect(body).toMatchObject(sample);

        })
    
    
    });

    describe("POST DELETE PATCH api/users" , () => {

            it("should create new user object", async () => {
                const sample = {"password": "BekelePassword", "username": "Abebe"}

                const {body , statusCode} = await supertest(app).post("/api/v1/users").send(sample)
                .accept("Accept" , "application/json")
                .expect("Content-Type" ,  "application/json; charset=utf-8");

                expect(statusCode).toBe(201);
                expect(body).toMatchObject({username : "Abebe"});


            })

            it("should delete user given the user Id" , async () => {

                const sample = {"password": "BekelePassword", "username": "Bekele"}
                const user = await User.create(sample)

                const {body , statusCode} = await supertest(app).delete("/api/v1/users/" + user._id)
                .accept("Accept" , "application/json");
                

                expect(statusCode).toBe(200);
                

            })

            it("should update user given the user Id" , async () => {

                const sample = {"password": "BekelePassword", "username": "Bekele"}
                const sample2 = {"password": "tobechanged", "username": "Bekele"}
                var user = await User.create(sample)

                const {body , statusCode} = await supertest(app).patch("/api/v1/users/" + user._id).send(sample2)
                .accept("Accept" , "application/json");
                
                expect(body.username).toBe("Bekele");
                expect(statusCode).toBe(200);
                
            })


        } )
    
       describe("POST login" , () => {
        it("should login given the correct username and password" , async () => {
            const sample = {"password": "BekelePassword", "username": "Abebe"}
            await supertest(app).post("/api/v1/users").send(sample)
            .accept("Accept" , "application/json")
            .expect("Content-Type" ,  "application/json; charset=utf-8");
            const {body} = await supertest(app).post("/api/v1/users/login").send(sample)
            expect(body.token).toBeTruthy()
                
            });
        it("should not login given wrong username and password" , async () => {
            const sample = {"password": "BekelePassword", "username": "Abebe"}
            await supertest(app).post("/api/v1/users").send(sample)
            .accept("Accept" , "application/json")
            .expect("Content-Type" ,  "application/json; charset=utf-8");
            
            const {body , stausCode} = await supertest(app).post("/api/v1/users/login").send({"password":"bekelepass" , "username" : "Abebe"})
            expect(body.token).toBeFalsy()

        })
            

    })
})

