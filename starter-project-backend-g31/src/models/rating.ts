import mongoose , { Schema, Document } from 'mongoose';
<<<<<<< HEAD
interface IRating extends Document{
=======

export interface IRating extends Document{
>>>>>>> a3f8e4ee173c190c0945eae16973b317e0c541ee
    articleID:string,
    userID:string,
    rating:number,
    ratedAt:string,
}
const ratingSchema : Schema<IRating> = new mongoose.Schema(
    {
        articleID: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        ratedAt: {
            type: Date,
            default: Date.now()
        }

    }
);

export const Rating = mongoose.model<IRating>("Rating", ratingSchema);


