import express from "express"
import {getAllRatings, getSingleRating, createRating, updateRating, deleteRating} from "../controller/rating"
const ratingRouter = express.Router()

ratingRouter.get("/", async (req, res) => {
    const response = await getAllRatings();
    if (response.statusCode === 200) {
        res.send(response.ratings)
    }
    else{
        res.status(response.statusCode).send(response.error)
    }
})

ratingRouter.get("/:id", async (req, res) => {
    const response = await getSingleRating(req.params.id)
    if (response.statusCode === 200) {
        res.send(response.rating)
    }
    else{
        res.status(response.statusCode).send(response.error)
    }
})

ratingRouter.post("/", async (req, res) => {
    const response = await createRating(req.body)
    if (response.statusCode === 201) {
        res.status(201).send(response.rating)
    }
    else{
        res.status(response.statusCode).send(response.error)
    }
})

ratingRouter.put("/:id", async (req, res) => {
    const response = await updateRating(req.params.id, req.body);
    if (response.statusCode === 200) {
        res.send(response.rating)
    }
    else{
        res.status(response.statusCode).send(response.error)
    }
})

ratingRouter.delete("/:id", async (req, res) => {
    const response = await deleteRating(req.params.id);
    if (response.statusCode === 200) {
        res.send(response.rating)
    }
    else{
        res.status(response.statusCode).send(response.error)
    }
})

export default ratingRouter;