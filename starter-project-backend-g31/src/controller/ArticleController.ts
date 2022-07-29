
import mongoose from 'mongoose';
import express, {Request, Response} from 'express';

const Article = require('../models/ArticleModel');

async function getMany (req:Request, res:Response){
    const articles = await Article.find()
                                  .sort('name');
    res.send(articles);
}

async function getByID (req:Request, res:Response){
    const article = await Article.findById(req.params.id);

    if(!article) return res.status(404)

    res.send(article);
}

async function createArticle (req:Request, res:Response) {
    let article = new Article({
        Author: req.body.Author,
        Content: req.body.Content,
        Rating: req.body.Rating,
        Comment: req.body.Comment,
        postDate: req.body.postDate

    });

    article = await article.save()
                            .catch((err : any) => res.status(400).send(err.message));
    res.send(article);
}

async function deleteOne (req:Request, res:Response){
    const article = await Article.findByIdAndRemove(req.params.id);
    console.log(article);    
}

async function updateOne (req:Request, res:Response){
    const article = await Article.findById(req.params.id);

    for (let param in req.body){
        article.param = req.body.param;
    }

    const result = await article.save();
    console.log(result);
}

module.exports.getMany = getMany;
module.exports.getById = getByID;
module.exports.createArticle = createArticle;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;