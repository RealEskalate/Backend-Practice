import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/users/:userID/posts/:postID/rates", routes.rateRouter);
app.use("/userProfiles", routes.userProfileRouter);

export default app;
