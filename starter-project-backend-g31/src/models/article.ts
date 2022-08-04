import mongoose, { Schema, Document } from 'mongoose';
import { UserProfile } from '../models/UserProfile';

export interface IArticle extends Document{
    author:mongoose.Types.ObjectId,
    content:string,
    comment:string,
    rating:string,
    postdate:Date
} 


const articleSchema: Schema<IArticle> = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'UserProfile',
        required: true,
        validate: {
            validator: async (id : mongoose.Types.ObjectId) => {
                const user = await UserProfile.findOne({ _id: id });
                return  user === null ? false : true
            },
            message : `author profile with given id does not exist`
        }
    },
    content: {
        type: String,
        minLength: 20,
        maxLength: 10000,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    comment: {
        type: [ String ],
        maxlength: 5000,
        minlength: 1
    },
    postdate: {
        type: Date,
        default: Date.now()
    }
});

export const Article = mongoose.model<IArticle>('Article', articleSchema);