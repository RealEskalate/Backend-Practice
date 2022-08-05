import express from 'express';
import {createComment , getComments , getComment , deleteComment , updateComment } from '../controllers/comment.controller';

const commentRouter = express.Router();


commentRouter.get('/', getComments); // get all comments
commentRouter.get('/:id' , getComment); // get comment by id
commentRouter.post('/' , createComment); // create comment
commentRouter.put('/:id' , updateComment); // update comment
// commentRouter.patch(); // patch comment
commentRouter.delete('/:id' , deleteComment); // delete comment

export default commentRouter;