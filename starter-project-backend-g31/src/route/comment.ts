import express from 'express';
import mongoose from 'mongoose';
const Comment = require('../models/comment')
const {
        getAllComments,
        getCommentById,
        addComment, 
        deleteCommentById, 
        updateCommentById} = require('../controllers/comment');

const router = express.Router();

router.get('/', getAllComments);

router.get('/:commentId', getCommentById);

router.post('/', addComment);

router.delete('/:commentId', deleteCommentById);

router.patch('/:commentId', updateCommentById);

module.exports = router;