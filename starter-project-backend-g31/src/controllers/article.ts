import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Article, IHash } from '../models/article';
import cloudinary from '../utils/cloudinary';
import { getCommentsWithArticleId, deleteCommentsWithArticleId } from './comment';


export const getMany = async (req: Request, res: Response) => {
    const article  = await Article.find()
    res.send(article);
}

export const getOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');
    const {limit, skip} = req.query;
    const comments = await getCommentsWithArticleId(Number(limit), Number(skip), req.params.id);
    const result = {article, comments: comments};
    res.send(result);
}

export const createArticle = async (req: Request, res: Response) => {
    try {
        let article = new Article({
            author: req.body.author,
            content: req.body.content,
            comment: req.body.comment
        });
        if (req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              upload_preset: "EskalatePracticeArticle"
            });
            article.avatar = result.secure_url;
            article.cloudinary_id = result.public_id;
          }
        const result = await article.save().catch((err) => res.status(400).send(err));
        res.json(result);
    } catch (err) {
        return res.status(404);
    }
}

export const updateOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    if (req.file){
        await cloudinary.v2.uploader.destroy(article.cloudinary_id)
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          upload_preset: "EskalatePracticeArticle"
        });
        article.avatar = result.secure_url;
        article.cloudinary_id = result.public_id;
      }
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
    
    await deleteCommentsWithArticleId(req.params.id)
                    .catch((err) => console.log("wtf"));

    await cloudinary.v2.uploader.destroy(article.cloudinary_id)
    res.send(article);
}

export const addRatingToArticle = async (id: string, val: number) => {
    const article = await Article.findById(id);
    if (article != null) {
        article.addRating(val)
    }
}

export const updateRatingForArticle = async (id: string, prev: number, current: number) => {
    const article = await Article.findById(id);
    if (article != null) {
        article.updateRating(prev, current)
    }
}
