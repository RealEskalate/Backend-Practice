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
  replies: [{
    type: Schema.Types.ObjectId,
  }],
  commentOwner: {
    type:  Schema.Types.ObjectId,
    required: true
  }
},
 { timestamps: {createdAt: 'created_at', updatedAt: 'modified_at'}})

CommentSchema.set('toJSON',{virtuals: true})
export default mongoose.model<ICommentInterface>('Comment', CommentSchema);
