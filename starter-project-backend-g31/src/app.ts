import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const articles = require('./routes/ArticleRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/articles', articles);

app.get("/", (req, res) => {
    res.send('hello!');
});


export default app
