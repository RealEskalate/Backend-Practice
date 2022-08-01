import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import articleRoutes from './routes/article'

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/users/:userID/posts/:postID/rates", routes.rateRouter);
app.use('api/v1/articles', articleRoutes)
export default app;
