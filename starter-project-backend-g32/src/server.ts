import app from "./app";
import mongoose from 'mongoose';


const PORT = process.env.PORT || 8000
const DB_URI = process.env.MONGO_URI || "";


mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(()=>{console.log('Database Commented !!')})
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch((err: any) => console.log('Error occurred while connecting', err));

