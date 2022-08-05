
import mongoose from 'mongoose'
import app from '../../app';
import {connect, clear, disconnect} from '../setupdb'
import request from 'supertest'
import {Comment} from '../../models/comment';

//connect to data base before starting any test
beforeAll(async () => {
  await connect();
});

//disconect from database after any test
afterAll(async ()=>{
  await disconnect();
})

jest.setTimeout(30000);

// dummy data to insert
const dummy = {
  author: "another person",
  description: "another description"
};

// Test Suite on comments feature
// describe('comment', () => {

// Create an object id for dummy document to use for testing
const commentId = mongoose.Types.ObjectId();

// create a variable to hole a sample/dummy document
let comment: any;

// create and save sample document before any test
beforeEach(async()=>{
  
  comment = new Comment({
    _id:commentId,
    author:"someone",
    description:"test comment description",
  });
  await comment.save();
});

// remove sample document after any test to avoid object id redundancy 
afterEach(async()=>{
  await comment.remove({})
});


// test the get comment by id feature
describe('GET: "/api/comment/:id" get a comment by id', ()=>{

  // check succes situations

      // check sent data and check status
      it('return the comment', async ()=>{

        const res = await request(app).get(`/api/comment/${commentId}`);
        
        expect(res.body).not.toBeNull();
        expect(res.status).toBe(200);
    
      });

      // on failure
      it('returns 404 status code', async()=>{
        const res = await request(app).get(`/api/comment/wrongId`);
        
        expect(res.status).toBe(404);

        
      });
  
  
});


// check the add comment feature
describe('POST: "/api/comment" Add new comment', ()=>{
  
  // if author and description are properly filled
  
    
    // check status code and check response data
    it('status code should be 200', async ()=>{
      const res = await request(app).post('/api/comment').send(dummy);

      expect(res.status).toBe(200);
      expect(
        {
          author: res.body.author,
          description: res.body.description 
        }).toStrictEqual(dummy);
    });

    
  
  // if author and description are not filled properly
  
    
    // check status
    it('return status code 404', async()=>{
      const res = await request(app).post('/api/comment').send({});
      expect(res.status).toBe(404);
    });
    
  

});


//check the update comment by id feature
describe('PATCH: "/api/comment/:id" update existing comment by id', ()=>{
  
    
    // check status, content type, database
    it('return status code 200', async ()=>{
      const res = await request(app).patch(`/api/comment/${commentId}`).send({
        author: "changed"
      });

      const updatedcomment = await Comment.findById(commentId);
      
      expect(updatedcomment.author).toStrictEqual("changed");
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      
    });
    

    
  
  
    //check status
    it('returns 404 status code', async()=>{
      const res = await request(app).patch(`/api/comment/wrongId`);
      
      expect(res.status).toBe(404);

      
    });

  
})



//check the delete comment by id feature
describe('DELETE: "/api/comment" delete existing comment by id', ()=>{
  

    // Check status code and database
    it('return 200 status code', async ()=>{
      const res = await request(app).delete(`/api/comment/${commentId}`); 
      
      const updatedcomment = await Comment.findById(commentId);

      expect(updatedcomment).toBeNull();
      expect(res.status).toBe(200); 
    });

    

        
  
  

    //check status code
    it('return 404 status code', async()=>{
      const res = await request(app).delete(`/api/comment/wrongId`);
      
      expect(res.status).toBe(404);
    })
    
  
})
// });

afterAll( async () => await disconnect());
