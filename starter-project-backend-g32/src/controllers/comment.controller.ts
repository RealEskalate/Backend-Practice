import {Request , Response } from "express";
import Comment from "../models/comment";
import mongoose, { isValidObjectId, mongo } from "mongoose";



export const createComment = async (req:Request, res:Response ) => {
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



export const getComment = async (req:Request, res:Response ) => {
    await Comment.findById(req.params.id).then((comment : typeof Comment) => {
        res.status(200).json(comment);
    }).catch((error: Error) => {
        res.status(404).json({
            error: error
        });
    }   );
}




export const getCommentsByArticleId = async (req:Request, res:Response) =>{
    var {page = 1, limit = 10} =  req.query;

    page = page.toString()
    limit = limit.toString()

    await Comment.find({articleId:mongoose.Types.ObjectId(req.params.articleId)}).limit(parseInt(limit)*1).skip((parseInt(page)-1)* parseInt(limit))
    .then((comments:any)=>{
        res.status(200).json(comments)
    })
    .catch((error:Error)=>{
        res.status(400).json({
            error:error
        })
    })
}

export const getComments = async (req:Request, res:Response ) => {

    var {page = 1, limit = 10} =  req.query;

    page = page.toString()
    limit = limit.toString()

    await Comment.find().limit(parseInt(limit)*1).skip((parseInt(page)-1)* parseInt(limit)).then((comments: any) => {
        res.status(200).json(comments);
    }).catch((error: Error) => {
        res.status(400).json({
            error: error
        });
    }   );
}

export const deleteComment = async (req:Request, res:Response ) => {
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


export const updateComment = async (req:Request, res:Response ) => {
    if(!req.body.content) {
        res.status(400).json({
            error: "Content is required"
        });
    }else{

    const {content} = req.body;

    await Comment.findByIdAndUpdate(req.params.id, content).then(() => {
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



export const patchComment = async (req:Request, res:Response ) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    
        res.status(400).json({
            error: "Invalid ID"
        });
    }
    else{
        const {content , createdAt} = req.body;
        await Comment.findById(req.params.id).then((comment : typeof Comment) => {
            if(content) {
                comment.content = content;
            }
            if(createdAt) {
                comment.createdAt = createdAt;
            }
           comment.save().then(() => {
                res.status(200).json({
                    message: "Comment updated successfully"
                });
            });
    }).catch((error: Error) => {
        res.status(404).json({
            error: error
        });
    }   );
    }
}
