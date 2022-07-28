import mongoose from 'mongoose';
import {Request, Response} from 'express';
const Article = require('../models/ArticleModel');

async function getMany(req: Request, res: Response) {
    const article  = await Article.find();
    res.send(article);
}

async function getById(req: Request, res: Response) {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    res.send(article);
}

async function createArticle(req: Request, res: Response) {
    let article = new Article({
        Author: req.body.Author,
        Content: req.body.Content,
        Rating: req.body.Rating,
        Comment: req.body.Comment,
        postDate: req.body.postDate
    });

    article = await article.save()
        .catch((error: any) => res.status(400).send(error.message));
    res.send(article);
}

async function updateOne(req: Request, res: Response) {
    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    article.set({
        Author: req.body.Author,
        Content: req.body.Content,
        Rating: req.body.Rating,
        Comment: req.body.Comment,
        postDate: req.body.postDate
    });

    article = await article.save()
        .catch((err: any) => res.status(400).send(err.message));
    res.send(article);

}




module.exports.getMany = getMany;
module.exports.createArticle = createArticle;
module.exports.updateOne = updateOne;