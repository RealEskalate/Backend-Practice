import express from 'express';
import mongoose from 'mongoose';

import {
        getCommentById,
        addComment, 
        deleteCommentById, 
        updateCommentById} from  '../controllers/comment';

const router = express.Router();


router.get('/:commentId', getCommentById);

router.post('/:userId/:articleId', addComment);

router.delete('/:commentId/:userId/:articleId', deleteCommentById);

router.patch('/:commentId/:userId/:articleId', updateCommentById);

export const commentRoute =  router;