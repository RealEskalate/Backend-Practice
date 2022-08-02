import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import User from './model'
import dataAccessLayer from '../../common/dal'

const UserDAL = dataAccessLayer(User)

// get all user
const tester = (res , next, func, message, filter)=> {

  func(filter)
  .then((data:any)=> {
    if (data.length == 0){
      throw message
    }
    res.status(200).json(data);
})
.catch(err=>{
  next(err)
})
}


const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  const filter = {isActive: true}

  UserDAL.getMany(filter)  
    .then((data:any)=> {
        if (data.length == 0){
          throw 'No User Found'
        }
        res.status(200).json(data);
    })
    .catch(err=>{
      next(err)
    })

}
// get user by id
const getAUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  UserDAL.getOne(userId).then((data:any)=>{
    if (!data){
      throw 'User Not Found'
    }
    res.status(200).json(data)
  })
  .catch(err=>{
    next(err)
  })

}
// create user
const create = (req: Request, res: Response, next: NextFunction) => {
  //   console.log(req.body)
  const newUser = req.body
  UserDAL.createOne(newUser)
  .then( (data)=>{
    if (!data){
      throw ' Couldn\'t  create a new user'
    }
    res.status(200).json(data)

  })
  .catch( err =>{
    next(err)
  })
  
}
// update user
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  const user = req.body
  UserDAL.updateOne(user, userId)
  .then( (data)=>{
    if (!data){
      throw ' Couldn\'t  Update the user'
    }
    res.status(200).json(data)

  })
  .catch( err =>{
    next(err)
  })


}
// delete user
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  UserDAL.deleteOne(userId)
  .then( (data)=>{
    if (!data){
      throw ' Couldn\'t  Delete the user'
    }
    res.status(200).json(data)

  })
  .catch( err =>{
    next(err)
  })


}
// login

// export functions
export default {
  getAllUser,
  getAUser,
  updateUser,
  deleteUser,
  create
}
