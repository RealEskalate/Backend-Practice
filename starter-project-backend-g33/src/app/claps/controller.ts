import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Clap from './model'

const ClapDal = dataAccessLayer(Clap)

const getAllClaps = (req: Request, res: Response, next: NextFunction) => {
  const filter = {}
  ClapDal.getMany(filter)
    .then((data: any) => {
      if (data.length() == 0) {
        throw 'no Clap found'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getClap = (req: Request, res: Response, next: NextFunction) => {
  ClapDal.getOne(req.params['id'])
    .then((data) => {
      if (!data) {
        throw 'No Clap by that ID is found'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const updateClap = (req: Request, res: Response, next: NextFunction) => {
  const newClap = req.body
  ClapDal.updateOne(newClap, newClap.id)
    .then((data) => {
      if (!data) {
        throw 'No Clap with this ID'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const createClap = (req: Request, res: Response, next: NextFunction) => {
  const newClap = req.body
  ClapDal.createOne(newClap)
    .then((data) => {
      if (!data) {
        throw 'Could not create clap'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const deleteClap = (req: Request, res: Response, next: NextFunction) => {
  ClapDal.deleteOne(req.params['id'])
    .then((data) => {
      if (!data) {
        throw 'Could not diable Clap'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

export default {
  getAllClaps,
  getClap,
  updateClap,
  createClap,
  deleteClap
}
