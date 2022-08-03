import IArticleInterface from "./interface";
import mongoose, {Schema} from 'mongoose';

const ArticleSchema : Schema = new Schema({
    id: {type:String , required : true},
    title:{type: String, required: true},
    content : {type: String, required : true},
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    featuredImage: {type : String },
    tags: {type: Array<string> },
    clappers: {type: Schema.Types.ObjectId }, 
    commentCount: {type : Number},
    },
    { timestamps: {createdAt: 'created_at', updatedAt: 'modified_at'}
});

ArticleSchema.set('toJSON',{virtuals: true})

export default mongoose.model<IArticleInterface>('Article', ArticleSchema);