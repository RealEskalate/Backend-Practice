
import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
import article from './routes/ArticleRoute';
import { commentRoute } from  './route/comment';

dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/articles', article);
app.use("/comment", commentRoute);

app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to our Blog App...');
});

export default app