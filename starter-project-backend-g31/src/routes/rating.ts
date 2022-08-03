import express from "express"
import {
    getAllRatings,
    getSingleRating,
    createRating,
    updateRating,
    deleteRating,
    getAllRatingsForAGivenArticle,
    getAllRatingsForAGivenArticleAndUser,
    getAllRatingsForAGivenUser
} from "../controllers/rating"

const ratingRouter = express.Router()

ratingRouter.get("/", async (req, res) => {
    await getAllRatings(req, res);
})

ratingRouter.get("/:id", async (req, res) => {
    await getSingleRating(req, res)
})

ratingRouter.get("/articles/:articleID", async (req, res) => {
    await getAllRatingsForAGivenArticle(req, res)
})

ratingRouter.get("/users/:userID", async (req, res) => {
    await getAllRatingsForAGivenUser(req, res)   
})

ratingRouter.get("/:articleID/:userID", async (req, res) => {
    await getAllRatingsForAGivenArticleAndUser(req, res)
})

ratingRouter.post("/", async (req, res) => {
    const response = await createRating(req, res)
})

ratingRouter.put("/:id", async (req, res) => {
    await updateRating(req, res);
})

ratingRouter.delete("/:id", async (req, res) => {
    await deleteRating(req, res);
})


export default ratingRouter;