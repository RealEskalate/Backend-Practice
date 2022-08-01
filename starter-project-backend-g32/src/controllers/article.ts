import { Request, Response } from 'express'
import Article from '../models/article'

export const getSpecificArticle = async (req: Request, res: Response) => {
        try {
            const doc = await Article.findOne({ _id: req.params.id }).lean().exec()
        
            if (!doc) {
                return res.status(404).end()
        }
        res.status(200).json({ data: doc })
        } catch (e) {
            res.status(400).end()
        }
  }
  
export const getAllArticle = async (req: Request, res: Response) => {
        try {
            const docs = await Article.find().lean().exec()
            res.status(200).json({ data: docs })
        } catch (e) {
            res.status(400).end()
        }
  }
  
export const createArticle = async (req: Request, res: Response) => {
        try {
            const doc = await Article.create({ ...req.body })
            res.status(201).json({ data: doc })
        } catch (e) {
            res.status(400).end()
        }
  }
  
export const updateArticle = async (req: Request, res: Response) => {
        try {
            const updatedDoc = await Article
                .findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                req.body,
                { new: true }
                )
                .lean()
                .exec()
            if (!updatedDoc) {
                return res.status(404).end()
            }
            res.status(200).json({ data: updatedDoc })
        } catch (e) {
            res.status(400).end()
        }
  }
  
export const deleteArticle = async (req: Request, res: Response) => {
        try {
            const removed = await Article.findOneAndRemove({
                _id: req.params.id,
            })
            if (!removed) {
                return res.status(404).end()
            }
            return res.status(200).json({ data: removed })
        } catch (e) {
            res.status(400).end()
        }
  }