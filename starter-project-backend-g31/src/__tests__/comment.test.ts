
import mongoose from 'mongoose'
import app from '../app'
import {connect, clear, disconnect} from '../tests/setupdb'
import request from 'supertest'




import {data_base} from '../model/model'

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
describe('comment', () => {

  // Create an object id for dummy document to use for testing
  const commentId = mongoose.Types.ObjectId();

  // create a variable to hole a sample/dummy document
  let comment: any;

  // create and save sample document before any test
  beforeEach(async()=>{
    
    comment = new data_base({
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
    
        // check status
      it('return status code 200', async () => {

        const res = await request(app).get('/comment');
        
        expect(res.status).toBe(200);
        expect(res.body).not.toBeNull();
      
      })

    // check for failure case
    
        it('return status code 404', async () =>{
        const res = await request(app).get('/wrongRoute');
        expect(res.status).toBe(404);
      });
    
    
  });

  // test the get comment by id feature
  describe('GET: "/comment/:id" get a comment by id', ()=>{

    
   
        // check sent data 
        it('return the comment', async ()=>{

          const res = await request(app).get(`/comment/${commentId}`);
          
          expect(res.body).not.toBeNull();

          expect(res.status).toBe(200);
      
        });
        it('returns 404 status code', async()=>{
          const res = await request(app).patch(`/comment/wrongId`);
          
          expect(res.status).toBe(404);
  
          
        });
        
  });
    
 


  // check the add comment feature
  describe('POST: "/comment" Add new comment', ()=>{
    
    
      const dummy = {
          author: "another person",
          description: "another description"
      };
      // check status code
      it('status code should be 200', async ()=>{
        const res = await request(app).post('/comment').send(dummy);

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
        const res = await request(app).post('/comment').send({});
        expect(res.status).toBe(404);
      });
      


  });


  //check the update comment by id feature
  describe('PATCH: "/comment/:id" update existing comment by id', ()=>{
    
      it('return status code 200', async ()=>{
        const res = await request(app).patch(`/comment/${commentId}`).send({
          author: "changed"
        });
        const updatedcomment = await data_base.findById(commentId);
        
        expect(updatedcomment.author).toStrictEqual("changed");
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      });

      //check status
      it('returns 404 status code', async()=>{
        const res = await request(app).patch(`/comment/wrongId`);
        
        expect(res.status).toBe(404);

        
      });

    }); 


  //check the delete comment by id feature
  describe('DELETE: "/comment" delete existing comment by id', ()=>{
    

      // Check status code
      it('return 200 status code', async ()=>{
        const res = await request(app).delete(`/comment/${commentId}`); 
        const updatedcomment = await data_base.findById(commentId);
        expect(updatedcomment).toBeNull();
        expect(res.status).toBe(200); 
      });



          

      //check status code
      it('return 404 status code', async()=>{
        const res = await request(app).delete(`/comment/wrongId`);
        
        expect(res.status).toBe(404);
      })
      
   
  })
})
