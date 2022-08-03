import { Router } from 'express'
import commentController from './controller'

const router = Router()


router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment)


router
  .route('/:id')
  .get(commentController.getComment)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment)

export default router
