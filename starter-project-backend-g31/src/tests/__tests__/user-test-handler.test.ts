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
    password: await bcrypt.hash('12345678', await bcrypt.genSalt(12)),
  })

  userId = user._id
});

const agent = request.agent(app)

jest.setTimeout(30000)

describe('GET /users/:id', () => {
  it('Retrieve specified user through Id', async () => {
    const res = await agent.get(`/users/${userId}`).send()
    expect(res.statusCode).toEqual(200)
  })
  it('Fail retrieving specified non existent user', async () => {
    const res = await agent.get(`/users/${new mongoose.Types.ObjectId()}`).send()
    expect(res.statusCode).toEqual(404)
  })
})

describe('POST /users', () => {
  it('Create a new user', async () => {
    const res = await agent
      .post(`/users/`)
      .send({ name: 'Lowin', email: 'lowin@gmail.com', password: 'normaluser' })
    expect(res.statusCode).toEqual(201)
  })
  it('Fail to create new user due to unspecified required parameters', async () => {
    const res = await agent
      .post(`/users/`)
      .send({ email: '' })
    expect(res.statusCode).toEqual(500)
  })
})

describe('UPDATE /users/update/:id', () => {
  it('Update existing user through a specified parameter', async () => {
    const res = await agent
      .patch(`/users/update/${userId}`)
      .send({ name: 'Aria' })
    expect(res.statusCode).toEqual(201)
  })

  it('Fail to update non-existent user', async () => {
    const res = await agent
      .patch(`/users/update/${new mongoose.Types.ObjectId()}`)
      .send({ name: 'New user name' })
    expect(res.statusCode).toEqual(404)
  })
})

describe('DELETE /users/delete/:id', () => {
  it('Delete existing user through specified Id', async () => {
    const res = await agent
      .delete(`/users/delete/${userId}`)
      .send()
    expect(res.statusCode).toEqual(201)
  })
  it('Fail to delete non-existing user', async () => {
    const res = await agent
      .delete(`/users/delete/${new mongoose.Types.ObjectId()}`)
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