import mongoose, { Schema } from 'mongoose'
import IClapInterface from './interface'

const ClapSchema: Schema = new Schema(
  {
    article: { type: mongoose.Types.ObjectId, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' }
  }
)

ClapSchema.set('toJSON', { virtuals: true })

export default mongoose.model<IClapInterface>('Clap', ClapSchema)
