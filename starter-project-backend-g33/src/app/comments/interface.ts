import mongoose, { Schema, Document } from 'mongoose'
import IArticleInterface from '../articles/interface'

interface ICommentInterface extends Document {
  articleId: IArticleInterface['_id']
  content: String
  commentOwner: String
  replies: String[]
}

export default ICommentInterface
