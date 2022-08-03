import express, {
  Application
} from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes.rateRouter);

export default app;
