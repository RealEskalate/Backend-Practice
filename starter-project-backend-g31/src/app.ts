import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

import { userRoute }  from './routes/user';
import { indexRoute } from './routes/index';


dotenv.config();

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRoute);

app.use('/users', userRoute);

export default app
