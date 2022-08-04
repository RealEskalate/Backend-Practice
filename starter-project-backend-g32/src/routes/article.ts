import { Router } from 'express'
import {
  getSpecificArticle,
  getAllArticle,
  createArticle,
  updateArticle,
  deleteArticle,

  //to be implimented
  getAllRating,
  getSpecificRating,
  createRating,
  updateRating,
  deleteRating,
} from '../controllers/article'

const router = Router()

router.route("/").post(createArticle).get(getAllArticle)
router.route("/:articleID").get(getSpecificArticle).put(updateArticle).delete(deleteArticle)
router.route("/:articleID/rating").post(createRating).get(getAllRating)
router.route("/:articleID/rating/:ratingId").get(getSpecificRating).put(updateRating).delete(deleteRating)

export default router
