import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Chapter from './model'
import { CustomError } from '../../middlewares/errorModel'

const chapterDal = dataAccessLayer(Chapter)

const getAllChapters = (req: Request, res: Response, next: NextFunction) => {
  const filter = { isActive: true }
  chapterDal
    .getMany(filter)
    .then((data: any) => {
      if (!data) {
        throw new CustomError(
          'Chapters not found',
          404,
          'Could not fetch chapters with this id'
        )
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getChapter = (req: Request, res: Response, next: NextFunction) => {
  chapterDal
    .getOne({ _id: req.params['id'] })
    .then((data) => {
      if (!data) {
        throw new CustomError(
          'Chapter not found',
          404,
          'Could not fetch chapter with this id'
        )
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const updateChapter = (req: Request, res: Response, next: NextFunction) => {
  const newChapter = req.body
  chapterDal
    .updateOne(newChapter, req.params.id)
    .then((data) => {
      if (!data) {
        throw new CustomError('Cannot update chapter', 400)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const createChapter = (req: Request, res: Response, next: NextFunction) => {
  const newChapter = req.body
  chapterDal
    .createOne(newChapter)
    .then((data) => {
      if (!data) {
        throw new CustomError('Cannot create chapter', 400)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const disableChapter = (req: Request, res: Response, next: NextFunction) => {
  chapterDal
    .deleteOne(req.params['id'])
    .then((data) => {
      if (!data) {
        throw new CustomError('Cannot disable chapter', 404)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

export default {
  getAllChapters,
  getChapter,
  updateChapter,
  createChapter,
  disableChapter
}
