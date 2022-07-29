import IArticleInterface from "./interface";
import mongoose , {Schema} from 'mongoose';

const ArticleSchema : Schema = new Schema({
    id: {type:String , required : true},
    title:{type: String, required: true},
    content : {type: String, required : true},
    Author: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    featuredImage: {type : String },
    tags: {type: Array<string> },
    clappers: {type: Schema.Types.ObjectId }, 
    commentCount: {type : Number}
});

export default mongoose.model<IArticleInterface>('Article', ArticleSchema);