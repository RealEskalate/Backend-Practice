import IUserInterface from '../users/interface'
import mongoose, { Schema, Document } from 'mongoose'

interface IArticleInterface extends Document {
  id: String
  title: String
  content: String
  author: IUserInterface['_id']
  featuredImage: String
  tags: String[]
  clappers: IUserInterface['_id'][]
  commentCount: number
}

export default IArticleInterface
