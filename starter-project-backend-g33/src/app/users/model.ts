import mongoose, { Schema, Document, Mongoose } from 'mongoose'
import IuserInterface from './interface'
import IChapterInterface from '../chapters/interface'

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true},
    email:{ type: String, required: true, unique: true},
    bio:  { type: String },
    profileImage: { type: String },
    isActive: { type: Boolean, default: true },
    chapter: {  type: Schema.Types.ObjectId, required: true }
  },
  
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

UserSchema.set('toJSON', { virtuals: true })

export default mongoose.model<IuserInterface>('User', UserSchema)