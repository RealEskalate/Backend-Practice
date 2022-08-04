import mongoose, { Schema, Document } from 'mongoose'

export interface RatingInterface extends Document {
  stars: Number
  article: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
}

const ratingSchema: Schema<RatingInterface> = new mongoose.Schema({
    stars: {
      type: Number,
      required: true,
      min: [1, "rating too low"],
      max: [5, "rating too high"],
    },
    articleId: {
        type: mongoose.Types.ObjectId,
        ref: "Article",
        required: true,
    },
    userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    }
  },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    }
)

const Rating = mongoose.model<RatingInterface>('Rating', ratingSchema)

export default Rating