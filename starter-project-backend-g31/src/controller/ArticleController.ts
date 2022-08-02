
import mongoose from 'mongoose';
import express, {Request, Response} from 'express';

const Article = require('../models/ArticleModel');

async function getMany (req:Request, res:Response){
    let articles;
    try {
        articles = await Article.find()
                                      .sort('name');
    }catch(err){
        res.status(400).send("got an error");
    }
    res.send(articles);
}

async function getByID (req:Request, res:Response){
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send("Invalid Id");
    }

    const article = await Article.findById(req.params.id);

    if(!article) return res.status(404).send("ID not found");

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
                            .then(() => res.send(article))
                            .catch((err : Error) => res.status(400).send(err.message));

}

async function deleteOne (req:Request, res:Response){
    const article = await Article.findByIdAndRemove(req.params.id);
    res.send(article);
}

async function updateOne (req:Request, res:Response){
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send("Invalid Id");
    };

    const article = await Article.findById(req.params.id);

    for (let param in req.body){

        article[param] = req.body[param];
      
    }

    const result = await article.save();
    res.send(result);
}

module.exports.getMany = getMany;
module.exports.getById = getByID;
module.exports.createArticle = createArticle;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;