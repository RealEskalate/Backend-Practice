import { Router } from 'express'
import articleController from './controller'

const router = Router()

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(articleController.createArticle)


router
  .route('/:id')
  .get(articleController.getArticle)
  .put(articleController.updateArticle)
  .delete(articleController.deleteArticle)

export default router
