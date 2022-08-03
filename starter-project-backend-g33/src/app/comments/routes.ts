import { Router } from 'express'
import commentController from './controller'

const router = Router()

router.get('/', commentController.getAllComments)
router.get('/:id', commentController.getComment)
router.put('/:id', commentController.updateComment)
router.post('/', commentController.createComment)
router.delete('/:id', commentController.deleteComment)

export default router
