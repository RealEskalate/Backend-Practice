import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
import articleRoutes from './routes/article'
import userRoutes from './routes/user'
import commentRouter from './routes/comment';
dotenv.config();


const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/" , json({}));
app.use("/api/v1/comment", commentRouter);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/userProfile', userRoutes);

export default app;

