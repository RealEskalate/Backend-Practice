const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
});


export const Comment = mongoose.model('Comment', CommentSchema);

