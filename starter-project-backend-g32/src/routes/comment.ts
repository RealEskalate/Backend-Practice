import express from 'express';
import {createComment , getComments , deleteComment , updateComment , patchComment, getCommentsByArticleId, getComment} from '../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.get("/",getComments)  //get comments
commentRouter.get("/:id",getComment) // get comment by id
commentRouter.get('/:articleid', getCommentsByArticleId) // get comments by article id
commentRouter.post('/' , createComment); // create comment
commentRouter.put('/:id' , updateComment); // update comment
commentRouter.patch('/:id' , patchComment); // patch comment
commentRouter.delete('/:id' , deleteComment); // delete comment

export default commentRouter; 