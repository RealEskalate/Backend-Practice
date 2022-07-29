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
    return res.status(response.statusCode).send(response.message)
});

// // Retrieval all notes
router.get("/rating",async(req,res)=>{
    const response=await controller.findAll();
    return res.status(200).send(response);
});
// // Retrieval a single rating with id
router.get("/rating/:ratingId",   async(req,res)=>{
    const response=await controller.findOne(req.params.ratingId);
    return res.status(200).send(response);
});
// // update a rating with a rating id
router.put("/rating/:ratingId",async(req,res)=>{
    if (!(req.params.ratingId)){
        return res.status(400).send({
            message:"Bad request"
        })
    }
    const response=await controller.update(req.params.ratingId,req.body);
    if (response.statusCode==200){
        return res.status(200).send(response.message)
    }
    return res.status(400).send(response);
});
// // Delete a rating with rating id
router.delete("/rating/:ratingId",async(req,res)=>{
    if(!req.params.ratingId){
        return res.status(404).send({
            message:"Not Found"
        })
    }
    const response=await controller.deleteRating(req.params.ratingId);
    if (response.statusCode==404){
        return res.status(404).send(response)
    }
    return res.status(201).send(response);
});
export default router
