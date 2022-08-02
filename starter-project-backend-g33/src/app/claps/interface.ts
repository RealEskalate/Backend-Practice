import mongoose, { Schema, Document } from 'mongoose'

interface IClapInterface extends Document {
  article: { type: mongoose.Types.ObjectId; required: true }
}

export default IClapInterface
