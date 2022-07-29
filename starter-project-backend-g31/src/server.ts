import app from './app'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
dotenv.config();
const PORT = process.env.PORT || 8000
const DB_URI = process.env.MONGO_URI || "";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

console.log("check: "+DB_URI);
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => {
    console.log("connected to mongodb...")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err: any) => console.log('Error occurred while connecting', err));
