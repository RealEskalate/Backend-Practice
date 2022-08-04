import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Article from '../articles/model'
import { CustomError } from '../../middlewares/errorModel'

const articleDal = dataAccessLayer(Article)

const getAllArticles = (req: Request, res: Response, next: NextFunction) => {
  articleDal
    .getMany({})
    .then((data: any) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getArticle = (req: Request, res: Response, next: NextFunction) => {
  const filter = { _id: req.params.id }
  articleDal
    .getOne(filter)
    .then((data: any) => {
      if (!data) {
        throw new CustomError('No article by that ID is found', 404, data)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
const getMyArticle = (req: Request, res: Response, next: NextFunction) => {
  const filter = { Author: req.params.id }
  articleDal
    .getOne(filter)
    .then((data: any) => {
      if (!data) {
        throw 'This author has no articles'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const updateArticle = (req: Request, res: Response, next: NextFunction) => {
  const newArticle = req.body
  articleDal
    .updateOne(newArticle, newArticle.id)
    .then((data: any) => {
      if (!data) {
        throw 'No article with this ID'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const createArticle = (req: Request, res: Response, next: NextFunction) => {
  const newChapter = req.body
  articleDal
    .createOne(newChapter)
    .then((data: any) => {
      if (!data) {
        throw 'No article with this ID'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
  articleDal
    .deleteOne(req.params['id'])
    .then((data: any) => {
      if (!data) {
        throw 'Could not delete Article'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const clap = (req: Request, res: Response, next: NextFunction) => {
  const props = req.body
  console.log(props, req.body)
  articleDal
    .clap(props)
    .then((data) => {
      if (!data) {
        res.status(502).send()
      }
      res.status(200).send({ message: 'clapped' })
    })
    .catch((err) => {
      next(err)
    })
}

export default {
  getAllArticles,
  getArticle,
  getMyArticle,
  updateArticle,
  createArticle,
  deleteArticle,
  clap
}
