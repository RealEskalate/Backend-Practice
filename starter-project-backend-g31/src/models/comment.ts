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


module.exports = mongoose.model('Comment', CommentSchema);

