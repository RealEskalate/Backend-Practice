import  app from '../../app'
import {connect, disconnect ,clear} from '../setupdb'
const request = require('supertest')(app)


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
        const res = await request.post(url).send( comment)
        '/////////////////////////////////////////////////////'

        expect(res.body.article).toBe(comment.article)
        expect(res.statusCode).toBe(201)
        })
    })

    describe("get all comments",()=>{
        
        it ("returns status code 200 if fetch succes",async()=>{
            await request.post(url).send(
                createComment(1))

            await request.post(url).send(
                createComment(1))


            '/////////////////////////////////////////////////////'   
            const res = await request.get(url)
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(200)
            expect(res.body.length).toBe(2)
        })
    })

    describe("get comment by id  test ",()=>{
        
        it ("returns status code 200 if fetch succes",async()=>{

            const resp = await request.post(url).send( createComment(1) )

           '/////////////////////////////////////////////////////'
            const res = await request.get(url+`/${resp.body._id}`)
            '/////////////////////////////////////////////////////'

            expect(res.statusCode).toBe(200)
            expect(res.body._id).toBe(resp.body._id)
        })
    })
    

    describe("update a comment test ",()=>{
        
        it ("returns status code 200 if fetch succes",async()=>{

            const resp = await request.post(url).send( createComment(1) )
            const article:string = "new article"

            '/////////////////////////////////////////////////////'
            const res = await request.put(url+`/${resp.body._id}`).send({article:article})
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(202)
            expect(res.body.article).toBe(article)
        })
    })

    describe("update a comment test ",()=>{
        
        it ("returns status code 200 if fetch succes",async()=>{
            const comment = createComment(1)

            const resp = await request.post(url).send( comment )

            '/////////////////////////////////////////////////////'
            const res = await request.delete(url+`/${resp.body._id}`)
            '/////////////////////////////////////////////////////'


            expect(res.statusCode).toBe(202)
            expect(res.body.article).toBe(comment.article)
        })
    })

})