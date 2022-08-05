const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  content: {
        type: String, 
        required: true
    },
  createdAt: {
      type: Date, 
      default: Date.now
    },
  })
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;