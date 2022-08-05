const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({    
        articleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Article",
            required: true
        },

        content: {
            type: String,
            required: true
        },
     },
    {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }
    }

)

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
