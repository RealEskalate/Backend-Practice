import { Request, Response } from 'express'
import Article from '../models/article'
import UserModel from '../models/user.models'

export const getSpecificArticle = async (req: Request, res: Response) => {
    try {
        const doc = await Article.findOne({ _id: req.params.articleID }).lean().exec()
        if (!doc) {
            return res.status(500).end()
        }
        res.status(200).json({ data: doc })
    } catch (e) {
        res.status(500).end()
    }
}

export const getAllArticle = async (req: Request, res: Response) => {
    try {
        const docs = await Article.find().lean().exec()
        res.status(200).json({ data: docs })
    } catch (e) {
        res.status(500).end()
    }
}

export const createArticle = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        if (!user) {
            res.status(404).end()
            return;
        }
        const doc = await Article.create({
            userID: req.body.userID,
            author: req.body.author,
            content: req.body.content,
            media: req.body.media
        })

        res.status(201).json({ data: doc })
    } catch (e: any) {
        res.status(500).end()
    }
}

export const updateArticle = async (req: Request, res: Response) => {
    try {
        const updatedDoc = await Article
            .findOneAndUpdate(
                {
                    _id: req.params.articleID,
                },
                {
                    author: req.body.author,
                    content: req.body.content,
                    media: req.body.media
                },
                { new: true }
            )
            .lean()
            .exec()
        if (!updatedDoc) {
            return res.status(500).end()
        }
        res.status(200).json({ data: updatedDoc })
    } catch (e) {
        res.status(500).end()
    }
}

export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const removed = await Article.findOneAndRemove({
            _id: req.params.articleID,
        })
        if (!removed) {
            return res.status(500).end()
        }
        return res.status(200).json({ data: removed })
    } catch (e) {
        res.status(500).end()
    }
}