import {Request,Response} from "express";
import Comment, { IComment } from '../models/Comment'


/** returns all comment */
export const getAllComment = async (req:Request,res:Response) =>{
    try{
        const comments:Array<IComment> = await Comment.find({})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
}

/** returns a comment match given id */

export const getCommentByID = async(req:Request,res:Response)=>{
    try{
        const comment:IComment|null = await Comment.findById(req.params.id)

        if (comment != null){
            res.status(200).json(comment)
        }
        else{
            
            res.status(204).json({message:"comment not found"})
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

/** creates a new comment and returns */
export const addNewComment = async (req:Request,res:Response)=>{
    try{
        const comment:IComment = await Comment.create(req.body)
        res.status(201).json(comment)
    }
    catch(err){
        res.status(400).json(err)
    }
    
}

/** updates a comment that matchs the given id */
export const updateComment = async(req:Request,res:Response)=>{
    try{
        await Comment.findByIdAndUpdate(req.params.id,req.body)

        const comment:IComment| null =  await Comment.findById(req.params.id)

        res.status(202).json(comment)
    }
    catch(err){
        res.status(400).json(err)
    }
}

/** deletes  a comment that matchs given id */

export const deleteComment = async(req:Request, res:Response)=>{
    try{
        const comment:IComment | null = await Comment.findByIdAndDelete(req.params.id)
        res.status(202).json(comment)
    }
    catch(err){
        res.status(404).json(err)
    }
}

