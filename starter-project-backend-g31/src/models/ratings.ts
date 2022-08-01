import  mongoose from "mongoose";
const {Schema} = mongoose
const RatingSchema=new Schema({
    articleId:  {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    rating:Number,
    date: {type:Date,default:Date.now}
})
export default mongoose.model("RatingsSchema",RatingSchema)





