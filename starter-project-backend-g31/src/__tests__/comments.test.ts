
import mongoose from 'mongoose'
import app from '../app'
import {connect, clear, disconnect} from '../tests/setupdb'
import request from 'supertest'




const Comment = require('../models/comment');

//connect to data base before starting any test
beforeAll(async () => {
  await connect();
});

//disconect from database after any test
afterAll(async ()=>{
  await disconnect();
})

jest.setTimeout(30000);

// Test Suite on comments feature
describe('comment', () => {

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


  // test the get all api feature
  describe('GET: "/comment" get the comment route', () => {
    describe('if route is correct', ()=>{
        // check status
      it('return status code 200', async () => {

        const res = await request(app).get('/comment');
        
        expect(res.status).toBe(200);
      
      });
      // check if data is returned
      it('return body with data of all comments', async () => {

        const res = await request(app).get('/comment');
        
        expect(res.body).not.toBeNull();
      
      });
    });
    
    // check for failure case
    describe('if incorrect route', ()=>{
        it('return status code 404', async () =>{
        const res = await request(app).get('/wrongRoute');
        expect(res.status).toBe(404);
      });
    });
    
  });

  // test the get comment by id feature
  describe('GET: "/comment/:id" get a comment by id', ()=>{

    // check succes situations
    describe('if comment found', ()=>{
        // check sent data 
        it('return the comment', async ()=>{

          const res = await request(app).get(`/comment/${commentId}`);
          
          expect(res.body).not.toBeNull();
      
        });
        // check status
        it('return 200 status code', async ()=>{

          const res = await request(app).get(`/comment/${commentId}`);

          expect(res.status).toBe(200);
        });
    });
    
  });


  // check the add comment feature
  describe('POST: "/comment" Add new comment', ()=>{
    
    // if author and description are properly filled
    describe('given author and description properly', ()=>{
      // dummy data to insert
      const dummy = {
          author: "another person",
          description: "another description"
      };
      // check status code
      it('status code should be 200', async ()=>{
        const res = await request(app).post('/comment').send(dummy);

        expect(res.status).toBe(200);
      });

      // check reeponse data
      it('response data should be same with dummy', async ()=>{
        const res = await request(app).post('/comment').send(dummy);
        
        // expect(res.body).not.toBeNull();
        expect(
          {
            author: res.body.author,
            description: res.body.description 
          }).toStrictEqual(dummy);
          
        // expect(res.body.description).toBe(dummy.description);
      });
      
    });

    // if author and description are not filled properly
    describe('wrong author and description input', ()=>{
      
      // check status
      it('return status code 404', async()=>{
        const res = await request(app).post('/comment').send({});
        expect(res.status).toBe(404);
      });
      
    });

  });


  //check the update comment by id feature
  describe('PATCH: "/comment/:id" update existing comment by id', ()=>{
    describe('if correct id',()=>{
      
      // check status
      it('return status code 200', async ()=>{
        const res = await request(app).patch(`/comment/${commentId}`).send({
          author: "changed"
        });

        expect(res.status).toBe(200);
      });
      // check returned content type
      it('return content type should be json', async()=>{
        const res = await request(app).patch(`/comment/${commentId}`).send({
          author: "changed"
        });

        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      });

      // check updated data
      it('database content should be updated', async()=>{
        const res = await request(app).patch(`/comment/${commentId}`).send({
          author: "changed"
        });
        const updatedcomment = await Comment.findById(commentId);
        
        expect(updatedcomment.author).toStrictEqual("changed");
      });
    });
    describe('if incorrect Id is supplied',()=>{

      //check status
      it('returns 404 status code', async()=>{
        const res = await request(app).patch(`/comment/wrongId`);
        
        expect(res.status).toBe(404);

        
      });

    }); 
  })



  //check the delete comment by id feature
  describe('DELETE: "/comment" delete existing comment by id', ()=>{
    describe('if correct id',()=>{

      // Check status code
      it('return 200 status code', async ()=>{
        const res = await request(app).delete(`/comment/${commentId}`); 
      
        expect(res.status).toBe(200); 
      });

      // Check data deleted
      it('the id must not exist in the database',async ()=>{
        const res = await request(app).delete(`/comment/${commentId}`);
        
        const updatedcomment = await Comment.findById(commentId);

        expect(updatedcomment).toBeNull();

      } )

          
    });
    describe('if incorrect id is supplied', ()=>{

      //check status code
      it('return 404 status code', async()=>{
        const res = await request(app).delete(`/comment/wrongId`);
        
        expect(res.status).toBe(404);
      })
      
    })
  })
});
