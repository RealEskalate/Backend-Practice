import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

dotenv.config();
import routes from "./routes";
import articleRoutes from './routes/article'
import userRoutes from './routes/user.routes'

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/" , json({}));
app.use("/api/v1", require('../src/routes/routes'));
app.use("/users/:userID/posts/:postID/rates", routes.rateRouter);
app.use('/api/v1/articles', articleRoutes)
app.use('/api/v1/userProfile', userRoutes)

export default app;

