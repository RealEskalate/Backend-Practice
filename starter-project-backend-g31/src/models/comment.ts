import mongoose from 'mongoose';
import {userModel} from './user-model';
import {Article} from './article';


const CommentSchema = new mongoose.Schema({
    author : {
        type : mongoose.Types.ObjectId,
        ref: userModel,
        required : true
    },
    article : {
        type : mongoose.Types.ObjectId,
        ref: Article,
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

