import mongoose from "mongoose";
const dataBase = new mongoose.Schema({
    author : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
});

export const data_base = mongoose.model('data_base', dataBase);