import { Request, Response } from 'express'
import Article from '../models/article'
import Rating  from '../models/rating'

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

  // Rating CRUD: 
//   router.route("/:articleID/rating").post(createRating).get(getAllRating)
// router.route("/:articleID/rating/:ratingId").get(getSpecificRating).put(updateRating).delete(deleteRating)

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
        const docs = await Rating.find({ articleId: req.params.articleID }).lean().exec()
        res.status(200).json({ data: docs })
    } catch (e) {
        res.status(404).end()
    }
}

//Handle Interlinking rating and Article
export const createRating = async (req: Request, res: Response) => {
    try {
        //check if user already rated
        const userRated = await Rating.find({ articleId: req.params.articleID, userId: req.body.userId}).lean().exec()
        if(userRated.length > 0)
        {
            console.log("User already Rated: ", userRated)
            res.status(404).end()
        }else{
            const doc = await Rating.create({
                stars: req.body.stars,
                articleId: req.params.articleID,
                userId: req.body.userId
            })
            res.status(201).json({ data: doc  })
        }
    } catch (e) {
        res.status(400).end()
    }
}

// Interlink with Article
export const updateRating = async (req: Request, res: Response) => {
    try {
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
            return res.status(500).end()
        }
        res.status(200).json({ data: updatedDoc })
    } catch (e) {
        res.status(500).end()
    }
}

//Interlink with Article
export const deleteRating = async (req: Request, res: Response) => {
    try {
        const removed = await Rating.findOneAndRemove(
        { 
            _id: req.params.ratingId,
            articleId: req.params.articleID
        })
        if (!removed) {
            return res.status(404).end()
        }
        return res.status(200).json({ data: removed })
    } catch (e) {
        res.status(400).end()
    }
}
