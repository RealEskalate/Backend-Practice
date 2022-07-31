import app from "./app"
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
//require('dotenv').config();

const PORT = process.env.PORT || 8000
const DB_URI = process.env.MONGO_URI || "";



mongoose.connect("mongodb+srv://Feruz-2:0hlTqxQnQuoqVldn@cluster0.bg5u5.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => {
    app.listen(PORT, () => console.log('Server running...'));
})
.catch((err: any) => console.log('Error occurred while connecting', err));

