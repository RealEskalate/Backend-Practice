import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

dotenv.config();
import articleRoutes from './routes/article'
import commentRoutes from './routes/comment'

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/" , json({}));
// app.use("/api/v1", require('../src/routes/routes'));
app.use('/api/v1/articles', articleRoutes)
app.use('/api/v1/comments', commentRoutes)

export default app;