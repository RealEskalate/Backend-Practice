import { Router } from 'express'
import articleController from './controller'

const router = Router()

router.get('/', articleController.getAllArticles)
router.get('/:id', articleController.getArticle)
router.put('/:id', articleController.updateArticle)
router.post('/', articleController.createArticle)
router.delete('/:id', articleController.deleteArticle)

export default router
