import express, {json} from 'express';
import dotenv from 'dotenv';
import router from "./routes"
dotenv.config();
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", json({}))
app.use("/",router)

export default app 
