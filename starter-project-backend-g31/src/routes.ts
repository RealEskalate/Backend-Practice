import express from "express"
const router = express.Router()
const controller=require("./controllers");
// create new rating
router.post("/rating",async (req,res)=>{
    if(!(req.body.articleId && req.body.userId)){
        return res.status(400).send({
            message: "Bad request"
        })
    }
    const response = await controller.create(req.body);
    return res.send(response)
});

// // Retrieval all notes
router.get("/rating",async(req,res)=>{
    const response=await controller.findAll();
    return res.send(response);
});
// // Retrieval a single rating with id
router.get("/rating/:ratingId",   async(req,res)=>{
    const response=await controller.findOne(req.params.ratingId);
    return res.send(response);
    
});
// // update a rating with a rating id
// router.put("/rating/:ratingId",controller.update);
// // Delete a rating with rating id
// router.delete("/rating/:ratingId",controller.deleteRating);
export default router