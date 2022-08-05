import mongoose from 'mongoose';

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
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
});


export const Comment = mongoose.model('Comment', CommentSchema);

