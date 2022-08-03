import { NextFunction, Request, Response } from 'express'
import bcryptjs, { hash } from 'bcryptjs'
import User from './model'
import dataAccessLayer from '../../common/dal'

const UserDAL = dataAccessLayer(User)

// register
const create = (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body
  const password = newUser.password
  console.log(password)

  bcryptjs.hash(password, 12, (hashError, hash) => {
    if (hashError) {
      return res.status(401).json({
        message: hashError.message,
        error: hashError
      })
    }
    console.log(hash)
    newUser.password = hash
    UserDAL.createOne(newUser)
      .then((data) => {
        if (!data) {
          throw " Couldn't  create a new user"
        }
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  })
}

const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  const filter = { isActive: true }

  UserDAL.getMany(filter)
    .then((data: any) => {
      if (data.length == 0) {
        throw 'No User Found'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  UserDAL.getOne(userId)
    .then((data: any) => {
      if (!data) {
        throw 'User Not Found'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
// update user
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  const changedProps = req.body
  console.log(changedProps)
  UserDAL.updateOne(changedProps, userId)
    .then((data) => {
      if (!data) {
        throw " Couldn't  Update the user"
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
// delete user
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  UserDAL.deleteOne(userId)
    .then((data) => {
      if (!data) {
        throw " Couldn't  Delete the user"
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
// login

// export functions
export default {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  create
}
