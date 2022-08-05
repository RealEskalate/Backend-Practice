import Comment from '../../src/resources/comments/model'
import Article from '../../src/resources/articles/model'
import supertest from 'supertest'
import { connect, disconnect, clear } from '../setupdb'
import app from '../../src/app'

const request = supertest(app)
let articleID = '',
  commentID = ''

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

beforeEach(async () => {
  const comment = {
    commentContent: 'Hail for free speech!',
    commentOwner: 'commenter',
    articleID: articleID
  }
  const newComment = new Comment(comment)
  await newComment.save()

  commentID = newComment._id
})

afterAll(async () => {
  await disconnect()
}, 100000)

afterEach(async () => {
  await clear()
})

describe('Testing comment controllers', () => {
  it('gets all comments of an article', async () => {
    const response = await request
      .get('/api/v1/comments/')
      .send({ articleID: articleID })
    expect(response.status).toBe(200)
    expect(response.body.length).not.toBe(0)
  })
  it('cannot get all comments of an article if no article id is provided', async () => {
    const response = await request.get('/api/v1/comments/').send({})
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Missing article id')
  })
  it('gets a comment by id', async () => {
    const response = await request
      .get(`/api/v1/comments/${commentID}`)
      .send({ articleID: articleID })
    expect(response.status).toBe(200)
    expect(response.body.commentContent).toBe('Hail for free speech!')
  })
  it('cannot get a comment by an invalid id', async () => {
    const response = await request
      .get('/api/v1/comments/123')
      .send({ articleID: articleID })
    expect(response.status).toBe(404)
  })

  it('creates a comment', async () => {
    const response = await request.post('/api/v1/comments/').send({
      commentContent: 'another comment!',
      commentOwner: 'newCommenter',
      articleID: articleID
    })
    expect(response.status).toBe(201)
    expect(response.body.commentContent).toBe('another comment!')
  })
  it('cannot create comment without article id', async () => {
    const response = await request.post('/api/v1/comments/').send({
      commentContent: 'another comment!',
      commentOwner: 'newCommenter'
    })
    expect(response.status).toBe(202)
    expect(response.body.message).toBe('Could not create the comment')
  })
  it('cannot create comment without comment content', async () => {
    const response = await request
      .post('/api/v1/comments/')
      .send({ commentOwner: 'newCommenter', articleID: articleID })
    expect(response.status).toBe(202)
    expect(response.body.message).toBe('Could not create the comment')
  })
  it('cannot create comment without comment owner', async () => {
    const response = await request
      .post('/api/v1/comments/')
      .send({ commentContent: 'another comment!', articleID: articleID })
    expect(response.status).toBe(202)
    expect(response.body.message).toBe('Could not create the comment')
  })

  it('updates a comment', async () => {
    const response = await request.put(`/api/v1/comments/${commentID}`).send({
      commentContent: 'updated comment!',
      commentOwner: 'newCommenter',
      articleID: articleID
    })
    expect(response.status).toBe(200)
    expect(response.body.commentContent).toBe('updated comment!')
  })
  it('cannot update a comment without comment content', async () => {
    const response = await request
      .put(`/api/v1/comments/${commentID}`)
      .send({ commentOwner: 'newCommenter', articleID: articleID })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Could not update the comment')
  })
  it('cannot update a comment without a request body', async () => {
    const response = await request.put(`/api/v1/comments/${commentID}`).send({})
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Could not update the comment')
  })

  it('cannot update a comment with the wrong commentID', async () => {
    const response = await request.put(`/api/v1/comments/123`).send({
      commentContent: 'updated comment!',
      commentOwner: 'newCommenter',
      articleID: articleID
    })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('No comment with this ID')
  })

  it('deletes a comment', async () => {
    const response = await request
      .delete(`/api/v1/comments/${commentID}`)
      .send({ articleID: articleID })
    expect(response.status).toBe(200)
  })
  it('cannot delete a comment with an invalid commentID', async () => {
    const response = await request
      .delete(`/api/v1/comments/123`)
      .send({ articleID: articleID })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Could not delete comment')
  })
  it('cannot delete a comment with no commentID', async () => {
    const response = await request
      .delete(`/api/v1/comments/`)
      .send({ articleID: articleID })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Could not delete comment')
  })
})
