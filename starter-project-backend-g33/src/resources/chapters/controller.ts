import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Chapter from './model'

const chapterDal = dataAccessLayer(Chapter)

const getAllChapters = (req: Request, res: Response, next: NextFunction) => {
  const filter = { isActive: true }
  chapterDal
    .getMany(filter)
    .then((data: any) => {
      if (!data) {
        res.status(404)
        throw 'no chapter found'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getChapter = (req: Request, res: Response, next: NextFunction) => {
  chapterDal
    .getOne(req.params['id'])
    .then((data) => {
      if (!data) {
        res.status(404)
        throw 'No chapter by that ID is found'
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
        res.status(404)
        throw 'No chapter with this ID'
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
        res.status(404)
        throw 'No chapter with this ID'
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
        res.status(400)
        throw 'Could not disable Chapter'
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
