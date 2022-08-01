import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
import { commentRoute } from  './route/comment';
dotenv.config();

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use("/comment", commentRoute);
// app.use("/", json({}))

app.all('*', (Reqest, Response) => {
    Response.status(404).send('resource not found')
})


export default app
