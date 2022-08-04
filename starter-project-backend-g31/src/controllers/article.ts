import mongoose from 'mongoose';
import {Request, Response} from 'express';
import {Article} from '../models/article';


export const getMany = async (req: Request, res: Response) => {
    const article  = await Article.find();
    res.send(article);
}

export const getOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    res.send(article);
}

export const createArticle = async(req: Request, res: Response) => {
    try{
        let article = new Article({
            author: req.body.author,
            content: req.body.content,
            rating: req.body.rating,
            comment: req.body.comment
        });
        const result = await article.save().catch((err) => res.status(400).send("Bad request"));
        res.json(result);
    }catch(err){
        return res.status(404);
    }
}

export const updateOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    article.set({
        author: req.body.author,
        content: req.body.content,
        rating: req.body.rating,
        comment: req.body.comment,
        postdate: req.body.postdate
    });

    await article.save()
        .then(() => res.status(200).send(article))
        .catch((err: Error) => res.status(400).send(err.message));

}

export const deleteOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    res.send(article);
}

