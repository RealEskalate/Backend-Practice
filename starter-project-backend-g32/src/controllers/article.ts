import { Request, Response } from 'express'
import Article from '../models/article'
import Rating  from '../models/rating'

const stars_arr = ["one", "two", "three", "four", "five"];
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

//Controller for Rating
export const getSpecificRating = async (req: Request, res: Response) => {
    try {
        const doc = await Rating.findOne({ _id: req.params.ratingId, articleId: req.params.articleID}).lean().exec()
        if (!doc) {
            return res.status(500).end()
            }
        res.status(200).json({ data: doc })
    } catch (e) {
        res.status(404).end()
    }
}

export const createRating = async (req: Request, res: Response) => {
    try {
        //check if user already rated
        const userRated = await Rating.find({ articleId: req.params.articleID, userId: req.body.userId}).lean().exec()
        if(userRated.length > 0)
        {
            res.status(404).end()
        }else{
            const theArticle = await Article.findOne({ _id: req.params.articleID }).lean().exec()
            if(!theArticle){
                return res.status(404).end()
            }
            //Now try to create the Rating and it will only proceed if there are no errors
            const doc = await Rating.create({
                stars: req.body.stars,
                articleId: req.params.articleID,
                userId: req.body.userId
            })
            //If you succeed creating the Rating then Update the respective article rating accordingly
            const stars = stars_arr[req.body.stars -1];
            const articleRating = theArticle.rating;
            if(articleRating)
            { 
                articleRating[stars] +=1; 
                await Article.findOneAndUpdate(
                    {
                        _id: req.params.articleID,
                    },
                    {
                        rating: {...articleRating}
                    }
                    ,
                    { new: true }
                    ).lean().exec()

            }else{return res.status(500)}

            res.status(201).json({ data: doc  })
        }
    } catch (e) {
        res.status(400).end()
    }
}

export const updateRating = async (req: Request, res: Response) => {
    try {
        //first check if the article exists 
        const theArticle = await Article.findOne({ _id: req.params.articleID }).lean().exec()
        if(!theArticle){
            return res.status(404).end()
        }

        //if the article exists then decrement the old value of stars in rating and increment the new one
        //Find the article's rating first
        const theRating = await Rating.findOne({ _id: req.params.ratingId, articleId: req.params.articleID}).lean().exec()
        if(!theRating){
            return res.status(404).end()
        }
        //Reserve the old number to decrement it in articles
        const oldStarNumber = theRating.stars;
        const oldStar = stars_arr[Number(oldStarNumber) - 1]

        //try updating the new value on the Rating first || it maybe subject to errors so better try first
        if(!req.body.stars || req.body.stars < 1 || req.body.stars > 5)
        {
            return res.status(400).end()
        }
        const updatedDoc = await Rating
            .findOneAndUpdate(
            { 
                _id: req.params.ratingId,
                articleId: req.params.articleID
            },
            { 
                stars: req.body.stars
             },
            { new: true }
            )
            .lean()
            .exec()
        if (!updatedDoc) {
            return res.status(404).end()
        }

        //Now update the article rating accordingly
        const articleRating = theArticle.rating;
        const stars = stars_arr[req.body.stars -1];
        if(articleRating)
        { 
            articleRating[oldStar] -=1;
            articleRating[stars] +=1;
            await Article.findOneAndUpdate(
                {
                    _id: req.params.articleID,
                },
                {
                    rating: {...articleRating}
                }
                ,
                { new: true }
                ).lean().exec()

        }else{return res.status(500)}


        res.status(200).json({ data: updatedDoc })
    } catch (e) {
        res.status(500).end()
    }
}