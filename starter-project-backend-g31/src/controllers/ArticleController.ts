import mongoose from 'mongoose';
import {Request, Response} from 'express';
const Article = require('../models/ArticleModel');

async function getMany(req: Request, res: Response) {
    const article  = await Article.find();
    res.send(article);
}

async function getOne(req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

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
        .then(() => res.status(200).send(article))
        .catch((error: Error) =>  res.status(400).send(error.message));
}

async function updateOne(req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

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
        .then(() => res.status(200).send(article))
        .catch((err: Error) => res.status(400).send(err.message));

}

async function deleteOne(req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    res.send(article);
}


module.exports.getMany = getMany;
module.exports.getOne = getOne;
module.exports.createArticle = createArticle;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;