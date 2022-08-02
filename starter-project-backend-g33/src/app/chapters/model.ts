import mongoose, { Schema } from 'mongoose'
import IChapterInterface from './interface'

const ChapterSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    hoe: { type: String, required: true },
    deputyHoe: { type: String, required: true },
    location: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' }
  }
)

ChapterSchema.set('toJSON', { virtuals: false })

export default mongoose.model<IChapterInterface>('Chapter', ChapterSchema)
