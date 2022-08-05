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
    name: 'Sasi',
    email: 'sasi@gmail.com',
    password: '12345678',
  })

  userId = user._id
});

const agent = request.agent(app)

jest.setTimeout(30000)

describe('GET /api/users/:id', () => {
  it('Retrieve specified user through Id', async () => {
    const res = await agent.get(`/api/users/${userId}`).send()
    expect(res.statusCode).toEqual(200)
  })
  it('Fail retrieving specified non existent user', async () => {
    const res = await agent.get(`/api/users/${new mongoose.Types.ObjectId()}`).send()
    expect(res.statusCode).toEqual(404)
  })
})

describe('POST /api/users', () => {
  it('Create a new user', async () => {
    const res = await agent
      .post(`/api/users/`)
      .send({ name: 'Lowin', email: 'lowin@gmail.com', password: 'normaluser' })
    expect(res.statusCode).toEqual(201)
  })
  it('Fail to create new user due to unspecified required parameters', async () => {
    const res = await agent
      .post(`/api/users/`)
      .send({ email: '' })
    expect(res.statusCode).toEqual(500)
  })
})

describe('UPDATE /api/users/update/:id', () => {
  it('Update existing user through a specified parameter', async () => {
    const res = await agent
      .patch(`/api/users/update/${userId}`)
      .send({ name: 'Aria' })
    expect(res.statusCode).toEqual(201)
  })

  it('Fail to update non-existent user', async () => {
    const res = await agent
      .patch(`/api/users/update/${new mongoose.Types.ObjectId()}`)
      .send({ name: 'New user name' })
    expect(res.statusCode).toEqual(404)
  })
})

describe('DELETE /api/users/delete/:id', () => {
  it('Delete existing user through specified Id', async () => {
    const res = await agent
      .delete(`/api/users/delete/${userId}`)
      .send()
    expect(res.statusCode).toEqual(201)
  })
  it('Fail to delete non-existing user', async () => {
    const res = await agent
      .delete(`/api/users/delete/${new mongoose.Types.ObjectId()}`)
      .send()
    expect(res.statusCode).toEqual(404)
  })
})

afterAll(async () => {
  await dbHandler.disconnect();
});
 
afterEach(async () => {
  await dbHandler.clear();
});