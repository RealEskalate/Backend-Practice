import { Router } from 'express'
import {
  getSpecificArticle,
  getAllArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/article'

const router = Router()

router.route("/").post(createArticle).get(getAllArticle)
router.route("/:articleID").get(getSpecificArticle).put(updateArticle).delete(deleteArticle)

export default router
