import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
import article from './routes/ArticleRoute';

dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/articles', article);

app.get('/', (req, res) => {
    res.send('Welcome to our Blog App...');
});

export default app
 
