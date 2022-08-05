import { Request, Response } from 'express'
import Article from '../models/article'
import Comment from '../models/comment'
import { getCommentsByArticleId } from './comment.controller'


// get article by id
export const getSpecificArticle = async (req: Request, res: Response) => {
        try {
            const doc = await Article.findOne({ _id: req.params.articleID }).lean().exec()

            if (!doc) {
                return res.status(404).end()
                }

            getCommentsByArticleId(req,res)

            const comments = await Comment.find({articleId:doc._id}).sort({"updated_at":-1, "created_at":-1})
            const count = await Comment.countDocuments({articleId:doc._id})
           
            const data = {
                umber_of_comments: count,
                comments:comments
            }
                          
            res.status(200).json({ data: data })
        } catch (e) {
            res.status(500).end()
        }
  }
  

  // get articles 
export const getAllArticle = async (req: Request, res: Response) => {
        try {

        var {page = 1, limit = 3} =  req.query;

        page = page.toString()
        limit = limit.toString()

    
        const articles = await Article.find().limit(parseInt(limit)*1).skip((parseInt(page)-1)* parseInt(limit)).sort({"updated_at":-1, "created_at":-1}).lean().exec();
        const count = await Article.countDocuments()

        const data = {
            number_of_articles:count,
            articles:articles
        }

    
        res.status(200).json({ data: data})
        } catch (e) {
            res.status(500).end()
        }
  }




  // create new article
export const createArticle = async (req: Request, res: Response) => {
        try {
            const doc = await Article.create({ 
                author: req.body.author,
                content: req.body.content,
                media: req.body.media
             })
            res.status(201).json({ data: doc  })
        } catch (e) {
            res.status(500).end()
        }
  }
  

// update article by id
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


  // delete article
  
export const deleteArticle = async (req: Request, res: Response) => {
        try {
            const removed = await Article.findOneAndRemove({
                _id: req.params.articleID,
            })
            if (!removed) {
                return res.status(500).end()
            }
            await Comment.deleteMany({articleId:removed._id})
            return res.status(200).json({ data: removed })
        } catch (e) {
            res.status(500).end()
        }
  }


function limit(limit: any) {
    throw new Error('Function not implemented.')
}
