import  {Request,Response} from 'express';
import mongoose from 'mongoose';
import {Comment} from'../models/comment';


export async function getCommentsWithArticleId (limit = 3, skip = 0, article_id: any) {
    const comments = await Comment.find({article: article_id})
                            .skip(skip)
                            .limit(limit)
                            .select('-article')
                            .sort('date');
    
    return comments;
}
export async function deleteCommentsWithArticleId(article_id: any) {
    const comments = await Comment.find({article: article_id});
    
    for (let comment of comments) {
        await Comment.findByIdAndDelete(comment._id);
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
        description: req.body.description,
        article: req.body.article
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
        const deletedComment = await Comment.findByIdAndRemove(req.params.commentId);
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

