import {Response, Request, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Article from '../articles/model'

const articleDal = dataAccessLayer(Article)

const getAllArticles = (req: Request, res: Response, next: NextFunction ) => {

    const filter = { isActive: true }
    articleDal.getMany(filter)
    .then((data: any) => {
        if (data.length() == 0){
            throw 'no article found';
        }
        res.status(200).json(data)

    })
    .catch(err =>{
        next(err)
    })

}

const getArticle = (req: Request, res: Response, next: NextFunction) => {
    articleDal.getOne(req.params['id'])
        .then((data: any) => {
            if (!data) {
                throw 'No article by that ID is found'
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })

}

const updateArticle = (req: Request, res: Response, next: NextFunction) => {
    const newArticle = req.body
    articleDal.updateOne(newArticle, newArticle.id)
        .then((data: any) => {
            if (!data) {
                throw 'No article with this ID'
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}

const createArticle = (req: Request, res: Response, next: NextFunction) => {
    const newArticle = req.body
    articleDal.createOne(newArticle)
        .then((data: any) => {
            if (!data) {
                throw 'No article with this ID'
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
    articleDal.deleteOne(req.params['id'])
        .then((data: any) => {
            if (!data) {
                throw 'Could not diable Aritcle'
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}

export default {
    getAllArticles,
    getArticle,
    updateArticle,
    createArticle,
    deleteArticle
}

