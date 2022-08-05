import {Request , Response } from "express";
import Comment from "../models/comment";
import mongoose from "mongoose";
import UserModel from "../models/user.models";


export const createComment = async (req:Request, res:Response ) => {
    try
    {
    const comment = new Comment(req.body);
    const result = await comment.save();
    return res.status(201).json({result: "succesfully created", data: result});
    }
    catch(error){
        return res.status(500).json({data:error});
    }
}



export const getComment = async (req:Request, res:Response ) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({data: 'invalid id'});
    
        const comment = await Comment.findById(req.params.id)
        .populate(
            {
            path: 'author',
            select: {'email':1,_id:0},
            }
        );
        return res.status(200).json({data: comment});
    }
    catch{
        return res.status(500).json({data: 'sever side error'});
    }
}



export const getComments = async (req:Request, res:Response ) => {
    try{
        const comments = await Comment.find().populate({
            path: 'author',
            select:{'email':1,_id:0}
        });
        res.status(200).json({data: comments});
    }
    catch{
        res.status(500).json({data: 'server error'});
    }
}


export const deleteComment = async (req:Request, res:Response ) => {
    try{
        const userId = req.query.userId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({data: 'invalid id'});
        }

        const user = await UserModel.findById(userId);
        if(!user) return res.status(404).json({data: 'user does not exist'});

        const comment = await Comment.findById(req.params.id);
        if (comment != null && comment.author != user._id){

            await Comment.findByIdAndDelete(req.params.id)
            
            return res.status(200).json({message:'succesfully deleted',comment:comment});
        }
        else{
            res.status(401).json({data: 'this user can not delete this comment'});
            
        }
    }
    catch{
        return res.status(500).json({data: 'error while deleting the comment.'});
    }
}



export const updateComment = async (req:Request, res:Response ) => {

    try{
        const userId = req.query.userId;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({data: 'invalid id'});
        }
        const user = await UserModel.findById(userId);

        if(!user) return res.status(404).json({data: 'user does not exist'});
        const comment = await Comment.findById(req.params.id);
        if (comment != null && comment.author != user._id){

            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, 
                {
                    $set: req.body
                },
                {
                    new:true,
                    runValidators: true,
                }
                );
            return res.status(200).json({message: 'succesfully edited', data: updatedComment});
        }
        else{
            res.status(401).json({data: 'this user can not edit this comment'});
            
        }
    }
    catch{
        return res.status(500).json({data: 'error while updating the comment'});
    }

}
