import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
import { router } from './routes/routes';

dotenv.config();

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user-profiles", router)
app.use("/", json({}))

export default app
