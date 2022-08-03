import {Schema} from 'mongoose';

const RateSchema = new Schema({
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
}, {timeStamps: true});

const RateModel = mongoose.model('Rate', RateSchema);