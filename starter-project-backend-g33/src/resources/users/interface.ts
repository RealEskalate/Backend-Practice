import mongoose, { Schema, Document } from 'mongoose'
import IChapterInterface from '../chapters/interface'

interface IUserInterface extends Document {
  firstName: String
  middleName: String
  lastName: String
  username: String
  email: String
  password: String
  bio: String
  profileImage: String
  isActive: Boolean
  chapter: IChapterInterface['_id']
}

export default IUserInterface
