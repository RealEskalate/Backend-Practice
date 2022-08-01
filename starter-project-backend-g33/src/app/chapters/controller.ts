import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Chapter from '../../services/db'

const chapterDal = dataAccessLayer(Chapter)

const getAllChapters = (req: Request, res: Response, next: NextFunction) => {

    const filter = { isActive: true }
    chapterDal.getAll(filter)
        .then((data: any) => {
            if (data.length() == 0) {
                throw 'no chapter found';
            }
            res.status(200).json(data)

        })
        .catch(err => {
            next(err)
        })

}

const getChapter = (req: Request, res: Response, next: NextFunction) => {
    chapterDal.getOne(req.params['id'])
        .then(data => {
            if (!data) {
                throw 'No chapter by that ID is found'
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}

const updateChapter = (req: Request, res: Response, next: NextFunction) => {
    const newChapter = req.body
    chapterDal.updateOne(newChapter, newChapter.id)
        .then(data => {
            if (!data) {
                throw 'No chapter with this ID'
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}

const createChapter = (req: Request, res: Response, next: NextFunction) => {
    const newChapter = req.body
    chapterDal.createChapter(newChapter, newChapter.id)
        .then(data => {
            if (!data) {
                throw 'No chapter with this ID'
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}

const disableChapter = (req: Request, res: Response, next: NextFunction) => {
    chapterDal.disableChapter(req.params['id'])
        .then(data => {
            if (!data) {
                throw 'Could not diable Chapter'
            }
            res.status(200).json(data)
        })
        .catch(err => {
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