import { Router } from 'express'
import articleController from './controller'

const router = Router()

router.get('/', articleController.getAllArticles)
router.get('/:id', articleController.getArticle)
router.put('/:id', articleController.updateArticle)
router.post('create', articleController.createArticle)
router.delete('/remove', articleController.deleteArticle)

export default router