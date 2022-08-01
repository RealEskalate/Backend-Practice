import  app from '../../app'
import {connect, disconnect ,clear} from '../setupdb'
import request from 'supertest'


describe("Comments api tests",()=>{

    beforeAll(async ()=>{
          await   connect()
        }
    )
    
    afterEach(async ()=>{
           await  clear()
        }
    )
    
    afterAll( async()=>{
           await disconnect()
        }
        
    )

    const createComment =(i:number)=> {
        return {article:`article ${i}`,
                commenter:`commenter ${i}`,
                body:`comment ${i}`}
    }


    const url:string = "/api/v1/comments"

    describe ('add comment ',()=>{
        it ('returns status code 200 if comment created ', async ()=>{
            const comment = createComment(1) 

            '/////////////////////////////////////////////////////'
            const res = await request(app).post(url).send( comment)
            '/////////////////////////////////////////////////////'

            expect(res.body.article).toBe(comment.article)
            expect(res.statusCode).toBe(201)
        })

        it ('returns status code 400 if missing article', async ()=>{
            const comment = {commenter:"commenter",body:"body"}
            const message = 'Comment validation failed: article: Path `article` is required.'
    
            '/////////////////////////////////////////////////////'
            const res = await request(app).post(url).send( comment)
            '/////////////////////////////////////////////////////'

            
            expect(res.statusCode).toBe(400)
            expect(res.body.message).toBe(message)
        })

        it ('returns status code 400 if missing commenter', async ()=>{
            const comment = {article:"article",body:"body"}
            const message = 'Comment validation failed: commenter: Path `commenter` is required.'
    
            '/////////////////////////////////////////////////////'
            const res = await request(app).post(url).send( comment)
            '/////////////////////////////////////////////////////'
    
        
            expect(res.statusCode).toBe(400)
            expect(res.body.message).toBe(message)
        })

        it ('returns status code 400 if missing body', async ()=>{
            const comment = {article:"article", commenter:"commenter"}
            const message = "Comment validation failed: body: Path `body` is required."
    
            '/////////////////////////////////////////////////////'
            const res = await request(app).post(url).send( comment)
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(400)
            expect(res.body.message).toBe(message)
        })
    })

    describe("get all comments",()=>{
        
        it ("returns status code 200 if fetch successes",async()=>{

            '+++++++++++++++++++++++++++++++++++++++++++++'
            await request(app).post(url).send(
                createComment(1))

            await request(app).post(url).send(
                createComment(1))
            '+++++++++++++++++++++++++++++++++++++++++++++'


            '/////////////////////////////////////////////////////'   
            const res = await request(app).get(url)
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(200)
            expect(res.body.length).toBe(2)
        })
    })


    describe("get comment by id  test ",()=>{
        
        it ("returns status code 200 if fetch successes",async()=>{

            const resp = await request(app).post(url).send( createComment(1) )

           '/////////////////////////////////////////////////////'
            const res = await request(app).get(url+`/${resp.body._id}`)
            '/////////////////////////////////////////////////////'

            expect(res.statusCode).toBe(200)
            expect(res.body._id).toBe(resp.body._id)
        })

        it ("returns status code 404 if didn't find comment",async()=>{

            const resp = await request(app).post(url).send( createComment(1) )
            const message:string  = "comment not found"


            '/////////////////////////////////////////////////////'
            resp.body._id = "1" + resp.body._id.slice(1)
            '/////////////////////////////////////////////////////'


           '/////////////////////////////////////////////////////'
            const res = await request(app).get(url+`/${resp.body._id}`)
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(404)
            expect(res.body.message).toBe(message)
        })
    })
    

    describe("update a comment test ",()=>{

        it ("returns status code 202 if update successes",async()=>{
    
            const resp = await request(app).post(url).send( createComment(1) )
            const article:string = "new article"
    
            '/////////////////////////////////////////////////////'
            const res = await request(app).put(url+`/${resp.body._id}`).send({article:article})
            '/////////////////////////////////////////////////////'
    
    
            expect(res.statusCode).toBe(202)
            expect(res.body.article).toBe(article)
        })
        
        it ("returns status code 404 if update failed",async()=>{

            const resp = await request(app).post(url).send( createComment(1) )
            const message:string  = "comment not found"

            '/////////////////////////////////////////////////////'
            resp.body._id = "1" + resp.body._id.slice(1)
            '/////////////////////////////////////////////////////'

            const article:string = "new article"

            '/////////////////////////////////////////////////////'
            const res = await request(app).put(url+`/${resp.body._id}`).send({article:article})
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(404)
            expect(res.body.message).toBe(message)
        })

    })

    describe("delete a comment test ",()=>{
        
        it ("returns status code 200 if delete successes",async()=>{
            const comment = createComment(1)

            const resp = await request(app).post(url).send( comment )

            '/////////////////////////////////////////////////////'
            const res = await request(app).delete(url+`/${resp.body._id}`)
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(202)
            expect(res.body.article).toBe(comment.article)
        })

        it ("returns status code 404 if delete failed",async()=>{
            const comment = createComment(1)

            const resp = await request(app).post(url).send( comment )

            const message:string  = "comment not found"
            resp.body._id = "1" + resp.body._id.slice(1)

            '/////////////////////////////////////////////////////'
            const res = await request(app).delete(url+`/${resp.body._id}`)
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(404)
            expect(res.body.message).toBe(message)
        })
    })

})