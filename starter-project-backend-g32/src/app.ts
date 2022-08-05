import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

dotenv.config();
import articleRoutes from './routes/article'


const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/" , json({}));
app.use("/api/v1", require('../src/routes/routes'));
app.use('/api/v1/articles', articleRoutes)

export default app;

