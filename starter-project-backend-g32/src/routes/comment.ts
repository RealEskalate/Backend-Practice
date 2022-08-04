import express from 'express';
import {createComment , getComments , getComment , deleteComment , updateComment } from '../controllers/comment.controller';

const commentRouter = express.Router();


commentRouter.get('/', getComments); // get all comments
commentRouter.get('/:commentID/:articleID' , getComment); // get comment by id
commentRouter.post('/' , createComment); // create comment
commentRouter.put('/:commentID/:articleID' , updateComment); // update comment
// commentRouter.patch('/:commentID/:articleID' , patchComment); // patch comment
commentRouter.delete('/:commentID/:articleID' , deleteComment); // delete comment

export default commentRouter;