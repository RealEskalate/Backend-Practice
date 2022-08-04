import { Request, Response } from 'express'
import Article from '../models/article'
import Rating  from '../models/rating'

const stars_arr = ["one", "two", "three", "four", "five"];

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

export const getAllRating = async (req: Request, res: Response) => {
    try {
        const theArticle = await Article.findOne({ _id: req.params.articleID }).lean().exec()
        if(!theArticle){
            console.log("No Article by that ID to getALL: ", theArticle)
            return res.status(404).end()
        }
        const docs = await Rating.find({ articleId: req.params.articleID }).lean().exec()
        res.status(200).json({ data: docs })
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
            console.log("User already Rated: ", userRated)
            res.status(404).end()
        }else{
            const theArticle = await Article.findOne({ _id: req.params.articleID }).lean().exec()
            if(!theArticle){
                console.log("No Article by that ID: ", theArticle)
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

            }else{console.log("Article rating not updated when creating a rating: ", theArticle)}

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
            console.log("No Article by that ID: to UpdateRating", theArticle)
            return res.status(404).end()
        }

        //if the article exists then decrement the old value of stars in rating and increment the new one
        //Find the article's rating first
        const theRating = await Rating.findOne({ _id: req.params.ratingId, articleId: req.params.articleID}).lean().exec()
        if(!theRating){
            console.log("No Rating by that ID: to UpdateRating")
            return res.status(404).end()
        }
        //Reserve the old number to decrement it in articles
        const oldStarNumber = theRating.stars;
        const oldStar = stars_arr[Number(oldStarNumber) - 1]

        //try updating the new value on the Rating first || it maybe subject to errors so better try first
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

        }else{console.log("Article rating not updated when Updating a rating: ", theArticle)}


        res.status(200).json({ data: updatedDoc })
    } catch (e) {
        res.status(500).end()
    }
}


export const deleteRating = async (req: Request, res: Response) => {
    try {
        //first check if the article exists 
        const theArticle = await Article.findOne({ _id: req.params.articleID }).lean().exec()
        if(!theArticle){
            console.log("No Article by that ID: to UpdateRating", theArticle)
            return res.status(404).end()
        }

        //Find the article's rating to decrement it's value in articles
        const theRating = await Rating.findOne({ _id: req.params.ratingId, articleId: req.params.articleID}).lean().exec()
        if(!theRating){
            console.log("No Rating by that ID: to UpdateRating")
            return res.status(404).end()
        }
        //Reserve the old number to decrement it in articles
        const oldStarNumber = theRating.stars;
        const oldStar = stars_arr[Number(oldStarNumber) - 1]

        //Remove the rating || must be done first as it maybe subjected to errors
        const removed = await Rating.findOneAndRemove(
        { 
            _id: req.params.ratingId,
            articleId: req.params.articleID
        })
        if (!removed) {
            return res.status(404).end()
        }

        //after removing successfully update the article accordingly
        const articleRating = theArticle.rating;
        if(articleRating)
        { 
            articleRating[oldStar] -=1;
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

        }else{console.log("Article rating not updated when Deleting a rating: ", theArticle)}
        return res.status(200).json({ data: removed })
    } catch (e) {
        res.status(400).end()
    }
}
