import mongoose from 'mongoose';


const articleSchema = new mongoose.Schema({
    Author: {
        type: String,
        minlength: 5,
        maxlength:50,
        required: true
    },
    Content: {
        type: String,
        minLength: 20,
        maxLength: 10000,
        required: true,
    },
    Rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    Comment: {
        type: [ String ],
        maxlength: 5000,
        minlength: 1
    },
    postDate: {
        type: Date,
        default: Date.now()
    }
});


module.exports =  mongoose.model('Article', articleSchema);