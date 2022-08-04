import mongoose , { Schema, Document } from 'mongoose';
import { UserProfile } from './UserProfile';

export interface IArticle extends Document{
    userId: string,
    author:string,
    content:string,
    comment:string,
    rating:string,
    postdate:Date
} 


const articleSchema: Schema<IArticle> = new mongoose.Schema({
    

    author: {

        
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true,
        validate: {
            validator: async (userId: mongoose.Schema.Types.ObjectId) =>
            {
                const user = await UserProfile.findById(userId)
                if (!user) return false
                return true
            },

            message: `user doesnt exist!`
          },
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