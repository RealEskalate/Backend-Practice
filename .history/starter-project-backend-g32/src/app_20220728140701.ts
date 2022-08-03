import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", json({}))

export default app
