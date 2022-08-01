import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import User from './model'

// get all user
const readAllUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'all user' })
}
// get user by id
const readOneUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  res.status(200).send({ message: `user with ${userId}` })
}
// create user
const signUp = (req: Request, res: Response, next: NextFunction) => {
  //   console.log(req.body)
  res.status(200).send({ message: 'user created ' })
}
// update user
const updateOneUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  res.status(200).send({ message: `user with ${userId} updated` })
}
// delete user
const deleteOneUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  res.status(200).send({ message: `user with ${userId} deleted` })
}
// login

// export functions
export default {
  readAllUser,
  readOneUser,
  updateOneUser,
  deleteOneUser,
  signUp
}
