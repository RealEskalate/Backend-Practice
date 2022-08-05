import mongoose from 'mongoose';
import {userModel} from './user-model';
import {Article} from './article';

export interface IComment extends Document{
    author:mongoose.Types.ObjectId,
    article:mongoose.Types.ObjectId,
    description:string,
    date:Date
} 

const CommentSchema :mongoose.Schema<IComment> = new mongoose.Schema({
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


export const Comment = mongoose.model<IComment>('Comment', CommentSchema);

