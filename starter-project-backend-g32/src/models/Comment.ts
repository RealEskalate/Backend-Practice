import mongoose, {Schema, Document} from 'mongoose'


export interface IComment extends Document {
    article:string,
    commenter:string,
    body:string,
}

const CommentSchema:Schema = new Schema({
    article:{type:String,required:true},
    commenter:{type:String,required:true},
    body:{type:String, required:true}
})

export default mongoose.model<IComment>("Comment",CommentSchema)