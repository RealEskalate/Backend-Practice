const mongoose = require('mongoose')
//import { Mongoose } from "mongoose";
const data_base = new mongoose.Schema({
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

module.exports = mongoose.model('data_base', data_base);