import mongoose , { Schema, Document } from 'mongoose';

export interface IArticle extends Document{
    author:string,
    content:string,
    comment:string,
    rating:string,
    postdate:Date
} 


const articleSchema: Schema<IArticle> = new mongoose.Schema({
    author: {
        type: String,
        minlength: 5,
        maxlength:50,
        required: true
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