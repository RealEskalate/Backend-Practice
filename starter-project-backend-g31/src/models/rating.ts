import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
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
            required: true,
            default: Date.now
        }

    }
);

export const Rating = mongoose.model("Rating", ratingSchema);


