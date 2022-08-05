import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../app'
import { userModel } from '../../models/user-model'
import * as dbHandler from '../setupdb'

import bcrypt from 'bcrypt'

let userId: any

beforeAll(async () => {
  await dbHandler.connect();
  const user = await userModel.create({
    name: 'Aria',
    email: 'aria@gmail.com',
    password: '12345678',
  })

  userId = user._id
});

const agent = request.agent(app)

jest.setTimeout(30000)

describe('POST /api/auth/login', () => {
  it('Login an existing user', async () => {
    const res = await agent
      .post(`/api/auth/login`)
      .send({ email: 'aria@gmail.com', password: '12345678' })
    expect(res.statusCode).toEqual(200)
  })
  it('Fail to authenticate user due to unprovided parameters', async () => {
    const res = await agent
      .post(`/api/auth/login`)
      .send({ email: '' })
    expect(res.statusCode).toEqual(400)
  })
  it('Fail to authenticate user due to incorrect username or password', async () => {
    const res = await agent
      .post(`/api/auth/login`)
      .send({ email: 'aria@gmail.com', password: 'ariauser' })
    expect(res.statusCode).toEqual(400)
  })
  it('Fail to authenticate non-existent user', async () => {
    const res = await agent
      .post(`/api/auth/login`)
      .send({ email: 'lowin@gmail.com', password: 'lowinuser' })
    expect(res.statusCode).toEqual(404)
  })
})


describe('POST /api/auth/signup', () => {
    it('Sign up a user', async () => {
      const res = await agent
        .post(`/api/auth/signup`)
        .send({ email: 'lowin@gmail.com', password: 'lowinuser' })
      expect(res.statusCode).toEqual(201)
    })
    it('Fail to authenticate user due to unprovided parameters', async () => {
      const res = await agent
        .post(`/api/auth/signup`)
        .send({ email: '' })
      expect(res.statusCode).toEqual(400)
    })
  })
  

afterAll(async () => {
  await dbHandler.disconnect();
});
 
afterEach(async () => {
  await dbHandler.clear();
});