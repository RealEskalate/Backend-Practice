import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

const logger = require('morgan')
// environmental variables configuration
dotenv.config();

const url = process.env.URL

// imported router
// const commentRouter = require('./routers/comment')



const app: Application = express();

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", json({}))
// app.use()




app.get("/this",(req,res)=>{
    res.status(200).send("done")
})

export default app
