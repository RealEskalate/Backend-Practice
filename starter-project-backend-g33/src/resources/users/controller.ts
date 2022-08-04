import { NextFunction, Request, Response } from 'express'
import bcrypt, { hash } from 'bcryptjs'
import User from './model'
import dataAccessLayer from '../../common/dal'
import jwt from 'jsonwebtoken'

const UserDAL = dataAccessLayer(User)

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body
  const { password } = newUser

  bcrypt.hash(password, 12, (hashError, hash) => {
    if (hashError) {
      return res.status(401).json({
        message: hashError.message,
        error: hashError
      })
    }

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

const login = (req: Request, res: Response, next: NextFunction) => {
  let { username, email, password } = req.body
  const props = username ? { username: username } : { email: email }

  UserDAL.getOne(props)
    .then((user: any) => {
      if (user.length !== 1) {
        return res.status(401).json({
          message: 'Unauthorized'
        })
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          return res.status(401).json({ message: 'password does not match' })
        } else {
          const token = jwt.sign({ id: user._id }, process.env.JWT_PASS)

          res.json({
            token,
            user,
            message: 'succesfully logged in!'
          })
        }
      })
    })
    .catch((err) => {
      next(err)
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
  UserDAL.getOne({ _id: userId })
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
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  const changedProps = req.body
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

export default {
  create,
  login,
  getAllUser,
  getUser,
  updateUser,
  deleteUser
}
