import  { Router} from "express";
import { addNewComment ,getCommentByID,deleteComment,updateComment,getAllComment} from "../controllers/commentController";

const commentRouter = Router();


commentRouter.get('/:id',getCommentByID)
commentRouter.get('/', getAllComment)
commentRouter.post('/', addNewComment)
commentRouter.put('/:id',updateComment)
commentRouter.delete('/:id',deleteComment)

export default  commentRouter 
