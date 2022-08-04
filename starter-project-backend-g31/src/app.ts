
import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';
import { router } from './routes/routes';
import ratingRoute from "./routes/rating"
import article from './routes/article';
import { commentRoute } from  './routes/comment';
import { userRoute }  from './routes/user';
import { indexRoute } from './routes/index';


dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user-profiles", router)
app.use('/api/articles', article);
app.use("/api/comment", commentRoute);
app.use("/api/ratings", ratingRoute);
app.use('/api/users', userRoute);
app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to our Blog App...');
});
app.use("/", indexRoute);

export default app
