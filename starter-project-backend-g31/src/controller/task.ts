import  {Request,Response} from 'express';
import { Express } from 'express';
import { Mongoose } from 'mongoose';
import {Comment} from "../model/model"

export async function getAllComment(req: Request,res: Response)
{   
    try{
        const comment = await Comment.find();
        res.status(200).json(comment);

    }catch(err){
        res.status(404).send("Error");
    }
    
}
export async function getCommentById(req: Request,res: Response)
{   
    try{
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    }catch(err){
        console.log(err);
        res.status(404).send("Error");
    }
    
}
export async function addComment(req: Request,res: Response)
{   
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

export async function updateCommentById(req: Request,res: Response)
{   
    try{
        const data = req.body
        const done = await Comment.updateOne({_id: req.params.id},{$set : data})
        res.status(200).send(done)
        }
        catch(err){
            res.status(404).send("Error");
        }
    
}

export async function deleteCommentById(req: Request,res: Response)
{   
    try{
        const deletedComment = await Comment.remove({ _id:req.params.id});
        res.status(200).json(deletedComment);
    }catch(err){
        res.status(404).send("Error");
    }
    
}
