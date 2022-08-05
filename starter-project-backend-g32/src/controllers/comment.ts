import {Request , Response } from "express";
import Comment from "../models/comment";
import Article from "../models/article";


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

    try{
        const article = await Article.findById({ _id: req.params.articleID })
        if (article){
            await Comment.findById(req.params.commentID).then((comment : typeof Comment) => {
                res.status(200).json(comment);
            }).catch((error: Error) => {
                res.status(404).json({
                    error: error
                });
            }   );
        }else{
            res.status(404).json({msg: "article not found"})
        }
    }catch(err){
        res.status(500).json({msg: err})
    }

}

export const getComments = async (req:Request, res:Response ) => {
    await Comment.find().then((comments: any) => {
        res.status(200).json(comments);
    }).catch((error: Error) => {
        res.status(400).json({
            error: error
        });
    }   );
}

export const deleteComment = async (req:Request, res:Response ) => {
    try{
        const article = await Article.findById({ _id: req.params.articleID })
        if (article){
            await Comment.findByIdAndRemove(req.params.commentID).then(() => {
                res.status(200).json({
                    message: "Comment deleted successfully"
                });
            }).catch((error: Error) => {
                res.status(404).json({
                    error: error
                });
            }   );
        }else{
            res.status(404).json({msg: "article not found"})
        }
    }catch(err){
        res.status(500).json(err)
    }

}

export const updateComment = async (req:Request, res:Response ) => {
    try{
        const article = await Article.findById({ _id: req.params.articleID })
        if (article){
            if(!req.body.content) {
                res.status(400).json({
                    error: "Content is required"
                });
            }else{
            const {content , createdAt} = req.body;
            const updatedComment = {"content" : content , "createdAt": createdAt ? createdAt : new Date()};
        
            await Comment.findByIdAndUpdate(req.params.commentID, updatedComment).then(() => {
                res.status(200).json({
                    message: "Comment updated successfully"
                });
            }).catch((error: Error) => {
                res.status(404).json({
                    error: error
                });
            }   );
            }  
        }else{
            res.status(404).json({msg: "article not found"})
        }
    }catch(err){
        res.status(500).json(err)
    }
 
}