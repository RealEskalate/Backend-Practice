
import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
import ratingRoute from "./routes/rating"
import article from './routes/ArticleRoute';
import { commentRoute } from  './routes/comment';

dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/articles', article);
app.use("/comment", commentRoute);
app.use("/ratings", ratingRoute);
app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to our Blog App...');
});

export default app