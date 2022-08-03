import {Schema} from 'mongoose';

const RatingSchema = new Schema({
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
}, {timeStamps: true});

