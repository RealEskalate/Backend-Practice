import express, {Application, Request, Response, NextFunction, json, Router} from 'express';
import dotenv from 'dotenv';
import { router_ } from'./router/router'
dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use("/", json({}))
app.use("/comment",router_)
app.all('*', (Reqest, Response) => {
    Response.status(404).send('resource not found')
})
export default app
