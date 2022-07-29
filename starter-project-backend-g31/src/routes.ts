import express from "express"
const router = express.Router()
const controller=require("./controllers");
// create new rating
router.post("/rating",controller.create);
// Retrieval all notes
router.get("/rating",controller.findAll);
// Retrieval a single rating with id
router.get("/rating/:ratingId",    controller.findOne);
// update a rating with a rating id
router.put("/rating/:ratingId",controller.update);
// Delete a rating with rating id
router.delete("/rating/:ratingId",controller.deleteRating);
export default router