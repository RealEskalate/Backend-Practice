import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import User from './model'

// get all user
const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'all user' })
}
// get user by id
const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  res.status(200).send({ message: `user with ${userId}` })
}
// create user
const create = (req: Request, res: Response, next: NextFunction) => {
  //   console.log(req.body)
  res.status(200).send({ message: 'user created ' })
}
// update user
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  res.status(200).send({ message: `user with ${userId} updated` })
}
// delete user
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  res.status(200).send({ message: `user with ${userId} deleted` })
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
