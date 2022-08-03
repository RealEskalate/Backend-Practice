import supertest from "supertest";
import app from "../../app";
const request = supertest(app);
let rate: number = 0;

import { connect, disconnect } from "../setupdb";

beforeAll(async () => {
  connect()
})

afterAll(async () => {
  disconnect()
})

describe("POST /users/:userID/posts/:postID/rates", () => {
