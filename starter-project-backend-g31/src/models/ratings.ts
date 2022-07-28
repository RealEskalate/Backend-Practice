import  mongoose from "mongoose";
const {Schema} = mongoose
const ratingSchema=new Schema({
    articleId: String,
    userId:String,
    data: {type:Date,default:Date.now}

})
