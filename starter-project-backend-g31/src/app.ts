import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

let userRouter = require('./routes/user');
let indexRouter = require('./routes/index');

dotenv.config();

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

app.use('/users', userRouter);

export default app
