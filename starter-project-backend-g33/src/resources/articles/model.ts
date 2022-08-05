import IArticleInterface from './interface'
import mongoose, { Schema } from 'mongoose'

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    featuredImage: { type: String },
    tags: [{ type: String }],
    clappers: [{ type: Schema.Types.ObjectId }],
    commentCount: { type: Number },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' } }
)

ArticleSchema.set('toJSON', { virtuals: true })

export default mongoose.model<IArticleInterface>('Article', ArticleSchema)
