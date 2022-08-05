import { Router } from 'express'
import articleController from './controller'
import { auth } from '../../middlewares/auth'
const router = Router()

router
  .route('/')
  .get(auth, articleController.getAllArticles)
  .post(auth, articleController.createArticle)
  .put(auth, articleController.clap)

router
  .route('/:id')
  .get(auth, articleController.getArticle)
  .put(auth, articleController.updateArticle)
  .delete(auth, articleController.deleteArticle)

router.route('/author/:id').get(auth, articleController.getMyArticle)
router.route('/search/:title').get()
export default router
