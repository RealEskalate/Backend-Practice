import mongoose , { Schema, Document } from 'mongoose';
interface IRating extends Document{
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


