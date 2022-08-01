import express from "express"
const router = express.Router()
const controller=require("./controllers");
// create new rating
router.post("/rating",async (req,res)=>{
        
    const response = await controller.create(req.body);
    return res.status(response.statusCode).send(response.message)
});

// // Retrieval all notes
router.get("/rating",async(req,res)=>{
    const response=await controller.findAll();
    return res.status(response.statusCode).send(response.message)
});
// // Retrieval a single rating with id
router.get("/rating/:ratingId",   async(req,res)=>{
    const response=await controller.findOne(req.params.ratingId);
    return res.status(response.statusCode).send(response.message);
});
// // update a rating with a rating id
router.put("/rating/:ratingId",async(req,res)=>{
    const response=await controller.update(req.params.ratingId,req.body);
    return res.status(response.statusCode).send(response.message) 
});
// // Delete a rating with rating id
router.delete("/rating/:ratingId",async(req,res)=>{
    const response=await controller.deleteRating(req.params.ratingId);
    return res.status(response.statusCode).send(response.message)
}); 
export default router
