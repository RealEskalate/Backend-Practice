const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: true},
    createdAt: {
        type: Date, 
        default: Date.now},})
module.exports = mongoose.model('Comment', commentSchema);