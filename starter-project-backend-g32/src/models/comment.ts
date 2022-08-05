import mongoose from 'mongoose';
import UserModel from '../models/user.models';
import { Document, Schema, model } from 'mongoose';
export interface Comment extends Document{
    author: mongoose.Types.ObjectId,
    content: string,
    createdAt: Date,
}

const commentSchema  = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required : true,
        ref: 'User',
    },
    content: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    });
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;