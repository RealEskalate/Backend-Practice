import app from "./app"
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { Console } from "console";
dotenv.config();
//require('dotenv').config();

const PORT = process.env.PORT || 8000
const DB_URI = process.env.MONGO_URI || "";
//console.log(DB_URI,"EXDRFG")


mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => {
    app.listen(PORT, () => console.log('Server running...'));
})
.catch((err: any) => console.log('Error occurred while connecting', err));

