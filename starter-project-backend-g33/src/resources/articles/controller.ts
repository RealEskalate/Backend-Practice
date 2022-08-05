import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Article from '../articles/model'
import { CustomError } from '../../middlewares/errorModel'

const articleDal = dataAccessLayer(Article)

const getAllArticles = (req: Request, res: Response, next: NextFunction) => {
  articleDal
    .getMany({ isActive: true })
    .then((data: any) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getArticle = (req: Request, res: Response, next: NextFunction) => {
  const filter = { _id: req.params.id, isActive: true }
  const { id, author } = req.params
  articleDal
    .getOne(filter)
    .then((data: any) => {
      if (!data) {
        throw new CustomError(
          'Article not found',
          404,
          'Could not fetch article with this id'
        )
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
const getMyArticle = (req: Request, res: Response, next: NextFunction) => {
  const filter = { author: req.params.id }
  articleDal
    .getOne(filter)
    .then((data: any) => {
      if (!data) {
        throw new CustomError(
          'No articles ',
          404,
          'This author has no articles'
        )
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, ...newArticle } = req.body
  const { author } = await articleDal.getOne({ _id: req.params.id })
  if (author == req.body.user[0]._id) {
    articleDal
      .updateOne(newArticle, req.params.id)
      .then((data: any) => {
        if (!data) {
          throw new CustomError('Could not update article', 400)
        }
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  } else
    res
      .status(401)
      .json({ message: 'user not authorized to edit this article' })
}

const createArticle = (req: Request, res: Response, next: NextFunction) => {
  const { user, ...newChapter } = req.body
  articleDal
    .createOne(newChapter)
    .then((data: any) => {
      if (!data) {
        throw new CustomError('Could not create article', 400)
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
        throw new CustomError('Could not delete Article', 400)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const clap = (req: Request, res: Response, next: NextFunction) => {
  const props = req.body
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
