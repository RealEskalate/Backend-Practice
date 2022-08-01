import app from './app'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
dotenv.config();
const PORT = process.env.PORT || 8000
const DB_URI = process.env.MONGO_URI || "";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => {
    app.listen(PORT);
})
.catch((err: any) => {return err.message});
