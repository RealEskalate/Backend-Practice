
import mongoose from 'mongoose'
import app from '../../app';
import {connect, clear, disconnect} from '../setupdb'
import request from 'supertest'
import {Comment} from '../../models/comment';
import {userModel} from '../../models/user-model';
import {Article} from '../../models/article';

import bcrypt from 'bcrypt';
import { getAllComments } from '../../controllers/comment';

//connect to data base before starting any test
beforeAll(async () => {
  await connect();
});

//disconect from database after any test
afterAll(async ()=>{
  await clear();
  await disconnect();
})

jest.setTimeout(30000);



// Test Suite on comments feature
// describe('comment', () => {

// Create an object id for dummy document to use for testing
const commentId = mongoose.Types.ObjectId();
const userId = mongoose.Types.ObjectId();
// let userId: any;
// let articleId: any;
const articleId = mongoose.Types.ObjectId();

// create a variable to hole a sample/dummy document
let comment: any;
let user: any;
let article: any;

// create and save sample document before any test
beforeEach(async()=>{
  user = new userModel({
    _id:userId,
    name: 'Sasi',
    email: 'sasi@gmail.com',
    password: "password"
  })
  await user.save()
  // userId = user._id;
  const article = new Article({
    _id : articleId,
    author: 'sample author',
    content: 'sample article 12345678901112131415',
    rating: 4
});
  await article.save()
  comment = new Comment({
    _id:commentId,
    author:userId,
    article: articleId,
    description:"test comment description",
  });
  await comment.save();
});
// dummy data to insert
const dummy = {
  description: "another description"
};
// remove sample document after any test to avoid object id redundancy 
afterEach(async()=>{
  await Comment.collection.remove({})
  await Article.collection.remove({})
  await userModel.collection.remove({})
  
  // await comment.remove({});
  // await user.remove({});
  // await article.remove({});
});


// test the get all api feature
describe('GET: "/comment" get the comment route', () => {

    // check status and check if data is returned
    it('status code 200 and return data', async () => {

      const res = await request(app).get('/comment');
      
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
    
    
    });
    
  
    // check for failure case
    
    it('return status code 404', async () =>{
      const res = await request(app).get('/wrongRoute');
      expect(res.status).toBe(404);
    });
  
});

// test the get comment by id feature
describe('GET: "/comment/:id" get a comment by id', ()=>{

  // check succes situations

      // check sent data and check status
      it('return the comment', async ()=>{

        const res = await request(app).get(`/comment/${commentId}`);
        //const ans = res.body.populate('author')
        //console.log(res.body.author,ans)
        expect(res.body).not.toBeNull();
        expect(res.status).toBe(200);
    
      });

      // on failure
      it('returns 404 status code', async()=>{
        const res = await request(app).get(`/comment/wrongId`);
        
        expect(res.status).toBe(404);

        
      });
  
  
});


// check the add comment feature
describe('POST: "/comment/:userId/:articleId" Add new comment', ()=>{
  
  // if author and description are properly filled
  
    
    // check status code and check response data
    it('status code should be 200', async ()=>{
      const res = await request(app).post(`/comment/${userId}/${articleId}`).send(dummy);

      expect(res.status).toBe(200);
      expect(
        {
          description: res.body.description 
        }).toStrictEqual(dummy);
    });

    
  
  // if author and description are not filled properly
  
    
    // check status
    it('return status code 404', async()=>{
      const res = await request(app).post('/comment').send({});
      expect(res.status).toBe(404);
    });
    
  

});


//check the update comment by id feature
describe('PATCH: "/comment/commentId:/id:userId/:articleId" update existing comment by id', ()=>{
  
    
    // check status, content type, database
    it('return status code 200', async ()=>{
      const res = await request(app).patch(`/comment/${commentId}/${userId}/${articleId}`).send({
        description: "changed"
      });

      const updatedcomment = await Comment.findById(commentId);
      
      expect(updatedcomment.description).toStrictEqual("changed");
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      
    });
    

    
  
  
    //check status
    it('returns 404 status code', async()=>{
      const res = await request(app).patch(`/comment/wrongId`);
      
      expect(res.status).toBe(404);

      
    });

  
})



//check the delete comment by id feature
describe('DELETE: "/comment" delete existing comment by id', ()=>{
  

    // Check status code and database
    it('return 200 status code', async ()=>{
      const res = await request(app).delete(`/comment/${commentId}/${userId}/${articleId}`); 
      
      const updatedcomment = await Comment.findById(commentId);

      expect(updatedcomment).toBeNull();
      expect(res.status).toBe(200); 
    });

    

        
  
  

    //check status code
    it('return 404 status code', async()=>{
      const res = await request(app).delete(`/comment/wrongId`);
      
      expect(res.status).toBe(404);
    })
    
  
})
// });
