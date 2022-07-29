import  mongoose from "mongoose";
const {Schema} = mongoose
const RatingSchema=new Schema({
    articleId: String,
    userId:String,
    rating:Number,
    date: {type:Date,default:Date.now}
})
export default mongoose.model("RatingsSchema",RatingSchema)




