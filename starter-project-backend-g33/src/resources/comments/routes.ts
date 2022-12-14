import { Router } from 'express'
import commentController from './controller'

const router = Router()

router.route('/').post(commentController.createComment)

router
  .route('/:id')
  .get(commentController.getAllComments)
  // .get(commentController.getComment)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment)

export default router
