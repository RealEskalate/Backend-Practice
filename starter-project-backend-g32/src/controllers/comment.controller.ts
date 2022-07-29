import {Request , Response } from "express";
const Comment = require('../models/comment');

const mongoose = require('mongoose');
const createComment = async (req:Request, res:Response ) => {
    const comment = new Comment(req.body);
    await comment.save().then(() => {
        res.status(201).json({
            message: "Comment added successfully",
            comment: comment
        });
    }).catch((error: Error) => {
        res.status(400).json({
            error: error
        });
    }   );

}

const getComment = async (req:Request, res:Response ) => {
    await Comment.findById(req.params.id).then((comment : typeof Comment) => {
        res.status(200).json(comment);
    }).catch((error: Error) => {
        res.status(404).json({
            error: error
        });
    }   );
}

const getComments = async (req:Request, res:Response ) => {
    await Comment.find().then((comments: any) => {
        res.status(200).json(comments);
    }).catch((error: Error) => {
        res.status(400).json({
            error: error
        });
    }   );
}

const deleteComment = async (req:Request, res:Response ) => {
    await Comment.findByIdAndRemove(req.params.id).then(() => {
        res.status(200).json({
            message: "Comment deleted successfully"
        });
    }).catch((error: Error) => {
        res.status(404).json({
            error: error
        });
    }   );
}

const updateComment = async (req:Request, res:Response ) => {
    if(!req.body.content) {
        res.status(400).json({
            error: "Content is required"
        });
    }else{
    await Comment.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.status(200).json({
            message: "Comment updated successfully"
        });
    }).catch((error: Error) => {
        res.status(404).json({
            error: error
        });
    }   );
    }   
}

const patchComment = async (req:Request, res:Response ) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            error: "Invalid ID"
        });
    }
    else if(!req.body.content) {
        res.status(400).json({
            error: "Content is required"
        });
    }
    else{
        await Comment.findByIdAndUpdate(req.params.id, req.body).then(() => {
            res.status(200).json({
                message: "Comment updated successfully"
            });
        }).catch((error: Error) => {
            res.status(404).json({
                error: error
            });
        }   );
    }
}


module.exports = {createComment , getComments , getComment , deleteComment , updateComment , patchComment};