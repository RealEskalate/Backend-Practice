import { Router } from 'express'
import {
  getSpecificArticle,
  getAllArticle,
  createArticle,
  updateArticle,
  deleteArticle,

  //Rating endpoints
  getSpecificRating,
  createRating,
  updateRating
} from '../controllers/article'

const router = Router()

router.route("/").post(createArticle).get(getAllArticle)
router.route("/:articleID").get(getSpecificArticle).put(updateArticle).delete(deleteArticle)
router.route("/:articleID/rating").post(createRating)
router.route("/:articleID/rating/:ratingId").get(getSpecificRating).put(updateRating)

export default router
