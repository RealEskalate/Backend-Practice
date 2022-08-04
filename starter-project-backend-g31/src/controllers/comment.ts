import  {Request,Response} from 'express';
import mongoose from 'mongoose';
import {Comment} from'../models/comment';
import {userModel} from'../models/user-model';
import {Article} from'../models/article';


export async function getAllComments(req: Request, res: Response){
    try{
        const comment = await Comment.find().populate({
            path: 'author',
        });
        
        // const ans = await comment;
        res.status(200).json(comment);
        // console.log(comment)
    }catch(err){
        res.status(404).send("Error");
    }
}

export async function getCommentById(req: Request,res: Response){
    
    try{
        const comment = await Comment.findById(req.params.commentId)
        .populate([ 
            {
                path: 'author ',
                select: 'name -_id'
            },
            {
                path :'article',
                select: 'content -_id'
            }
        ]);
        console.log(comment)
        // const ans = await comment.populate('author');
        
        res.status(200).send(comment);
    }catch(err){
        
        res.status(404).send("Error");
    }
} 

export async function addComment(req: Request,res:Response){
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");
    
    const article = await Article.findById(req.params.articleId);
    if (!article) return res.status(404).send("Article not found");
    

    const comment = new Comment({
        author: req.params.userId,
        article: req.params.articleId,
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

    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");
    const article = await Article.findById(req.params.articleId);
    if (!article) return res.status(404).send("Article not found");

    try{

        
        const comment = await Comment.findById(req.params.commentId);
        
        if (comment.author == req.params.userId){
            const deletedComment = await Comment.remove({ _id:req.params.commentId});
            res.status(200).json(deletedComment);
        }
       else{
            res.status(401).send("You are not alowed to delete this comment");
       }
    }catch(err){
        
    }
}

export async function  updateCommentById(req:Request,res:Response){
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");
    const article = await Article.findById(req.params.articleId);
    if (!article) return res.status(404).send("Article not found");

    try{
        const comment = await Comment.findById(req.params.commentId);
        
        if (comment.author == req.params.userId){
            const updatedComment = await Comment.updateOne({ _id:req.params.commentId}, 
                { $set:{
                        description: req.body.description 
                }});
            res.status(200).json(updatedComment);
        }
        else{
            res.status(401).send("You are not alowed to edit this comment");
       }
    }catch(err){
        
        res.status(404).send(err);
    }
}

