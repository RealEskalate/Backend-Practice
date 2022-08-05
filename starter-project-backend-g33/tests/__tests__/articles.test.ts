import Article from '../../src/resources/articles/model'
import supertest from 'supertest'
import { connect, disconnect, clear } from '../setupdb'
import app from '../../src/app'

const request = supertest(app)
let articleID = ''
beforeAll(async () => {
  await connect()
  const article = new Article({
    title: 'test article',
    content: 'I can publish an ariticle, just for testing purposes',
    author: 'someone'
  })
  await article.save()
  articleID = article._id
})

afterAll(async () => {
  await disconnect()
}, 100000)

afterEach(async () => {
  await clear()
})

describe('Testing article controllers', () => {
  it('gets all articles', async () => {
    const response = await request.get('/api/v1/articles/').send({})
    expect(response.status).toBe(200)
    expect(response.body.length).not.toBe(0)
  })

  it('gets an article by id', async () => {
    const response = await request.get(`/api/v1/articles/${articleID}`).send({})
    expect(response.status).toBe(200)
    expect(response.body.title).toBe('test article')
  })
  it('cannot get an article by id if invalid is provided', async () => {
    const response = await request.get(`/api/v1/articles/123`).send({})
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('No article by that ID is found')
  })
})

describe('article creation', () => {
  it('creates an article', async () => {
    const response = await request.post('/api/v1/articles/').send({
      title: 'another test article',
      content: 'Publishing a new article',
      author: 'otherPerson'
    })
    expect(response.status).toBe(201)
  })

  it('cannot create an article if no title is provided', async () => {
    const response = await request.post('/api/v1/articles/').send({
      content: 'Publishing a new article'
    })
    expect(response.status).toBe(400)
  })

  it('cannot create an article if no content is provided', async () => {
    const response = await request.post('/api/v1/articles/').send({
      title: 'another test article'
    })
    expect(response.status).toBe(400)
  })

  it('cannot create an article if no author is provided', async () => {
    const response = await request.post('/api/v1/articles/').send({
      title: 'another test article',
      content: 'Publishing a new article'
    })
    expect(response.status).toBe(400)
  })
})

describe('updating an article', () => {
  it('updates an article', async () => {
    const response = await request.put(`/api/v1/articles/${articleID}`).send({
      title: 'another test article',
      content: 'Publishing a new article'
    })
    expect(response.status).toBe(200)
  })

  it('cannot update an article if no article id is provided', async () => {
    const response = await request.put(`/api/v1/articles/`).send({
      title: 'another test article',
      content: 'Publishing a new article'
    })
    expect(response.status).toBe(400)
  })

  it('cannot update an article if body is provided', async () => {
    const response = await request.put(`/api/v1/articles/${articleID}`).send()
    expect(response.status).toBe(400)
  })
})

describe('deleting an article', () => {
  it('deletes an article', async () => {
    const response = await request
      .delete(`/api/v1/articles/${articleID}`)
      .send({})
    expect(response.status).toBe(200)
  })
  it('cannot delete an article if no article id is provided', async () => {
    const response = await request.delete(`/api/v1/articles/`).send({})
    expect(response.status).toBe(400)
  })
})
