import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import userRouter from '../src/routes/user.routes'

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('userProfile', userRouter);
app.use("/users/:userID/posts/:postID/rates", routes.rateRouter);


export default app;
