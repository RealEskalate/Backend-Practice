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
} from "../controller/rating"

const ratingRouter = express.Router()

ratingRouter.get("/", async (req, res) => {
    const response = await getAllRatings();
    res.status(response.statusCode).send(response.body)
})

ratingRouter.get("/:id", async (req, res) => {
    const response = await getSingleRating(req.params.id)
    res.status(response.statusCode).send(response.body)
})

ratingRouter.get("/articles/:articleID", async (req, res) => {
    const response = await getAllRatingsForAGivenArticle(req.params.articleID)
    res.status(response.statusCode).send(response.body)
    
})

ratingRouter.get("/users/:userID", async (req, res) => {
    const response = await getAllRatingsForAGivenUser(req.params.userID)
    res.status(response.statusCode).send(response.body)
    
})

ratingRouter.get("/:articleID/:userID", async (req, res) => {
    const response = await getAllRatingsForAGivenArticleAndUser(req.params.articleID, req.params.userID)
    res.status(response.statusCode).send(response.body)
})

ratingRouter.post("/", async (req, res) => {
    const response = await createRating(req.body)
    res.status(response.statusCode).send(response.body)
})

ratingRouter.put("/:id", async (req, res) => {
    const response = await updateRating(req.params.id, req.body);
    res.status(response.statusCode).send(response.body)
})

ratingRouter.delete("/:id", async (req, res) => {
    const response = await deleteRating(req.params.id);
    res.status(response.statusCode).send(response.body)
})


export default ratingRouter;