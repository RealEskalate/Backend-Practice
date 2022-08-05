import mongoose , { Schema, Document } from 'mongoose';

export interface IRating extends Document{
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
            required: true,
            min: [1, "Must be at least 1"],
            max: [5, "Must be at most 5"]
        },
        ratedAt: {
            type: Date,
            default: Date.now()
        }

    }
);

export const Rating = mongoose.model<IRating>("Rating", ratingSchema);


