import ICommentInterface from "./interface"
import mongoose, {Schema} from 'mongoose'

const CommentSchema = new Schema({
  articleId: {
    type:  Schema.Types.ObjectId,
    required: true,
  },
  commentContent: {
    type: String,
    required: true,
  },
  replies: {
    type: String,
  },
  commentOwner: {
    type:  String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

CommentSchema.set('toJSON',{virtuals: true})
export default mongoose.model<ICommentInterface>('Comment', CommentSchema);
