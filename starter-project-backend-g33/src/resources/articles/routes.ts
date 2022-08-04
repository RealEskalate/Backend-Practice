import { Router } from 'express'
import articleController from './controller'

const router = Router()

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(articleController.createArticle)
  .put(articleController.clap)

router
  .route('/:id')
  .get(articleController.getArticle)
  .put(articleController.updateArticle)
  .delete(articleController.deleteArticle)

router.route('/author/:id').get(articleController.getMyArticle)
export default router
