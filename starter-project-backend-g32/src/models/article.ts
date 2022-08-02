import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
  author: String
  content: String
  media: String
}

const articleSchema: Schema<IArticle> = new mongoose.Schema({
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    media: {
      type: String,
      required: false,
      default: ''
    }
  },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    }
)

const Article = mongoose.model<IArticle>('Article', articleSchema)

export default Article