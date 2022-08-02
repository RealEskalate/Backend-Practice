import express from 'express';
import mongoose from 'mongoose';

import {
        getAllComments,
        getCommentById,
        addComment, 
        deleteCommentById, 
        updateCommentById} from  '../controllers/comment';

const router = express.Router();

router.get('/', getAllComments);

router.get('/:commentId', getCommentById);

router.post('/', addComment);

router.delete('/:commentId', deleteCommentById);

router.patch('/:commentId', updateCommentById);

export const commentRoute =  router;