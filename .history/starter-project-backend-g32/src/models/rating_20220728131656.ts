import {Schema} from 'mongoose';

const RatingSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        
    }
})