import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import rateRouter from "./routes/rate";
import articleRouter from "./routes/article";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/v1/rates", rateRouter);
app.use("/api/v1/articles", articleRouter);

export default app;
