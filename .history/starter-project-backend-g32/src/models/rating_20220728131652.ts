import {Schema} from 'mongoose';

const RatingSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        
    }
})