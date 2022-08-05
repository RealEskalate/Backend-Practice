import { NextFunction, Request, Response } from 'express';
import bcrypt, { hash } from 'bcryptjs';
import User from './model'
import dataAccessLayer from '../../common/dal'
import jwt from 'jsonwebtoken';
import { CustomError } from '../../middlewares/errorModel';

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
          throw new CustomError('Cannot create new user', 404)
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
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const { password, ...userWithoutPassword } = user.toObject()

        res.status(201).json({
          ...userWithoutPassword,
          token
        })
      } else throw new CustomError('username or password incorrect')
    })
    .catch((err) => {
      next(err)
    })
}
const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  const filter = { isActive: true }
  UserDAL.getManyUserSecured(filter)
    .then((data: any) => {
      if (data.length == 0) {
        throw new CustomError('No user found', 404)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  UserDAL.getOne({ _id: userId, isActive: true })
    .then((data: any) => {
      if (!data) {
        throw new CustomError('User is not found', 404)
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
        throw new CustomError('Cannot update user', 404)
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
        throw new CustomError('Cannot delete user', 404)
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
