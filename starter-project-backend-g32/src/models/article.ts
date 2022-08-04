import mongoose, { Schema, Document, AnyObject } from 'mongoose'

export interface IArticle extends Document {
  author: String
  content: String
  media: String
  rating?: AnyObject
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
    },
    rating: {
      one: {
        type: Number,
        default: 0
      },
      two: {
        type: Number,
        default: 0
      },
      three: {
        type: Number,
        default: 0
      },
      four: {
        type: Number,
        default: 0
      },
      five: {
        type: Number,
        default: 0
      },
      default: { one: 0, two: 0, three: 0, four: 0, five: 0 }
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