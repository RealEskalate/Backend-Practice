import mongoose, { Schema } from 'mongoose'
import IUserInterface from './interface'

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: true },
    profileImage: { type: String },
    isActive: { type: Boolean, default: true },
    chapter: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true }
  },

  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

UserSchema.set('toJSON', { virtuals: true })

export default mongoose.model<IUserInterface>('User', UserSchema)
