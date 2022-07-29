
import mongoose from 'mongoose';

const Article = mongoose.model('Article', new mongoose.Schema({
    Author:{
        type: String,
        minlenght: 5,
        maxlength: 50
    },

    Comment: {
        type: [ String ],
        minlength: 1,
        maxlength: 1000
    },

    Rating:{
        type: Number,
        min: 0,
        max: 5,
        required: true 
    },

    postDate: {
        type: Date,
        default: Date.now()
    },
    
    Content: {
        type: String,
        minlength: 100,
        maxlength: 10000
    }
}));

module.exports = Article;