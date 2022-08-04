import express, {Application, Request, Response, NextFunction, json} from 'express';
import dotenv from 'dotenv';

dotenv.config();
import routes from "./routes";//not clear
import articleRoutes from './routes/article'


const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/" , json({}));
app.use("/api/v1", require('../src/routes/routes'));
app.use("/users/:userID/posts/:postID/rates", routes.rateRouter);.//not clear
app.use('/api/v1/articles', articleRoutes)

export default app;