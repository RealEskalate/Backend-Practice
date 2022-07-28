import mongoose from "mongoose";
import Joi from "joi";

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

export const validate = function(rating: any){
    const schema = Joi.object({
        articleID: Joi.string().required(),
        userID: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required()
    });
    return schema.validate(rating);
}

