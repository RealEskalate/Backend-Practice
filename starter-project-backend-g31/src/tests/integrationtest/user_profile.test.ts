import supertest from "supertest";
import mongoose from "mongoose";
import {connect, disconnect } from "../setupdb";
import app from "../../app";

import {request, Request, response} from "express"
import { createProfile } from "../../service/userProfileService";
const userId = new mongoose.Types.ObjectId().toString();

export const userProfile = {
    _id: userId,
    name: "jane.doe@example.com",
    bio: "Jane Doe",
  };

describe("user profile", () => {

    beforeAll(connect);
    afterAll(disconnect);
    describe("get user Profile route", ()=> {
      describe("given the user profile exist", () => {
          
          it("should return 200 status and the user profile", async () => {
              // @ts-ignore
          
              const user = await createProfile(userProfile);
      
              const { body, statusCode } = await supertest(app).get(
                `/api/${userId}`
              );
      
              expect(statusCode).toBe(200);
              expect(body._id).toBe(userId);
            });
      
      });


    });

    describe("update user Profile route", ()=> {
      describe("given the user profile exist", () => {
          
          it("should return 200 status and the user profile", async () => {
              // @ts-ignore
          
              const user = await createProfile(userProfile);
      
              const { body, statusCode } = await supertest(app).get(
                `/api/${userId}`
              );
      
              expect(statusCode).toBe(200);
              expect(body._id).toBe(userId);
            });
      
      });


    });

});