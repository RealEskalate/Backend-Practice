
import supertest from "supertest";
import mongoose from "mongoose";
import {clear, connect, disconnect } from "../setupdb";
import app from "../../app";

import {request, Request, response} from "express"

import { UserProfile } from "../../models/UserProfile";

export const userId = new mongoose.Types.ObjectId().toString();
export const userProfile = {
  _id: userId,
  username: "sdcfggh",
  name: "jane.doe@example.com",
  bio: "Jane Doe",
  phone: "+25143674477"
};

jest.setTimeout(10000)
describe("user profile", () => {

  beforeAll(async () => {
    await connect();
})
// beforeEach(async () => {
//     await clear();
// })
afterAll(async () => {
    await clear();
    disconnect();
})

    describe("CREATE user Profile route", ()=> {
      describe("", () => {
          
          it("should return 201 status and the user profile", async () => {
              // @ts-ignore
              
             
      
              const { body, statusCode } = await supertest(app).post(
                `/api/user-profiles`
              ).send(userProfile);
      
              expect(statusCode).toBe(201);
              expect(body._id).toBe(userId);
            });
      
      });

      describe("given the profile already exist", () => {
          
        it("should return 400 status", async () => {
            // @ts-ignore
            
           
    
            const { body, statusCode } = await supertest(app).post(
              `/api/user-profiles`
            ).send(userProfile);
    
            expect(statusCode).toBe(400);
           
          });
    
      });

    describe("given the profile is missing required field", () => {
          
        it("should return 400 status", async () => {
            // @ts-ignore
           
            userProfile = {
              bio: "Jane Doe",
              phone: "+25143674477"
            };
    
            const { body, statusCode } = await supertest(app).post(
              `/api/user-profiles`
            ).send(userProfile);
    
            expect(statusCode).toBe(400);
           
          });
    
    });


    });

    

    describe("get user Profile route", ()=> {
      describe("given the user profile exist", () => {
          
          it("should return 200 status and the user profile", async () => {
              // @ts-ignore
              
              
      
              const { body, statusCode } = await supertest(app).get(
                `/api/user-profiles/${userId}`
              );
      
              expect(statusCode).toBe(200);
              expect(body._id).toBe(userId);
            });
      
      });

      describe("given the user profile does not exist", () => {
          
        it("should return 404 status", async () => {
            // @ts-ignore
            
            
    
            const { body, statusCode } = await supertest(app).get(
              `/api/user-profiles/${new mongoose.Types.ObjectId().toString()}`
            );
    
            expect(statusCode).toBe(404);
           
          });
    
    });

    });

    describe("get user Profiles route", ()=> {
      describe("given the user profiles exist", () => {
          
          it("should return 200 status and user profiles list", async () => {
              // @ts-ignore
              
      
              const { body, statusCode } = await supertest(app).get(
                `/api/user-profiles/`
              );
      
              expect(statusCode).toBe(200);
              expect(body.length).toBeGreaterThan(0)
            });
      
      });


    });

    describe("update user Profile route", ()=> {
      describe("given the user profile exist", () => {
          
          it("should return 200 status and user profiles list", async () => {
              // @ts-ignore
              
              export const newUserProfile = {
                
                name: "new name",
                bio: "Jane Doe",
                phone: "+253762737263"
              };
              const { statusCode } = await supertest(app).patch(
                `/api/user-profiles/${userId}`
              ).send(newUserProfile);

              const {body} = await supertest(app).get(
                `/api/user-profiles/${userId}`
              );
      
              expect(statusCode).toBe(200);
              expect(body.name).toBe(newUserProfile.name)
              expect(body.bio).toBe(newUserProfile.bio)
              expect(body.phone).toBe(newUserProfile.phone)
            });
      
      });

      describe("given the user profile does not  exist", () => {
          
        it("should return 400 status", async () => {
            // @ts-ignore
            
            const newUserProfile = {
              
              name: "new name",
              bio: "Jane Doe",
              phone: "+253762737263"
            };
            const fakeId = "dkfjds".toString();
            const { statusCode } = await supertest(app).patch(
              `/api/user-profiles/${1}`
            ).send(newUserProfile);

            
    
            expect(statusCode).toBe(400);
           
          });
    
    });


    });

    describe("delete user Profile route", ()=> {
      describe("given the user profile exist", () => {
          
          it("should return 204 status", async () => {
              // @ts-ignore
              
              const {statusCode} = await supertest(app).delete(
                `/api/user-profiles/${userId}`
              );
      
              expect(statusCode).toBe(204);
              
            });
      
      });

      describe("given the user profile does not exist", () => {
          
        it("should return 204 status", async () => {
            // @ts-ignore
            
            const {statusCode} = await supertest(app).delete(
              `/api/user-profiles/${userId}`
            );
    
            expect(statusCode).toBe(204);
            
          });
    
    });


    });
    
    
    
});