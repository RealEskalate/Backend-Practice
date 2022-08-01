import  {Request,Response} from 'express';
import mongoose from 'mongoose';
import {Comment} from'../models/comment';


export async function getAllComments(req: Request, res: Response){
    try{
        const comment = await Comment.find();
        res.status(200).json(comment);

    }catch(err){
        res.status(404).send("Error");
    }
}

export async function getCommentById(req: Request,res: Response){
    
    try{
        const comment = await Comment.findById(req.params.commentId);
        res.status(200).json(comment);
    }catch(err){
        
        res.status(404).send("Error");
    }
} 

export async function addComment(req: Request,res:Response){
    const comment = new Comment({
        author: req.body.author,
        description: req.body.description
    })
    try{
        const savedComment = await comment.save();
        res.status(200).json(savedComment);
    }catch(err){
        res.status(404).send("Error");
    }
}

export async function deleteCommentById(req:Request,res:Response){
    try{
        const deletedComment = await Comment.remove({ _id:req.params.commentId});
        res.status(200).json(deletedComment);
    }catch(err){
        res.status(404).send("Error");
    }
}

export async function  updateCommentById(req:Request,res:Response){
    try{
        
        const updatedComment = await Comment.updateOne({ _id:req.params.commentId}, 
            { $set:{
                    author: req.body.author, 
                    description: req.body.description 
            }});
        res.status(200).json(updatedComment);
    }catch(err){
        
        res.status(404).send(err);
    }
}

