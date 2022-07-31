import { userModel } from '../models/user-model';
import { NextFunction, Request, Response } from 'express'
 
/* 
@Description: Get all users 
@Route: users/ 
@Access: Public 
*/ 
export const getUsers = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const users = await userModel.find({})
      if (!users) {
        return res
          .status(404)
          .json({ data: `Users do not exist` })
      }
      return res.status(200).json({ data: users })
    } catch (err) {
      return res
        .status(500)
        .json({ data: 'Error: Retrieving users failed' })
    }
  }

 
/* 
@Description: Get a user by ID 
@Route: users/:id 
@Access: Public 
*/ 
export const getUserById = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const { id } = req.params
      const user = await userModel.findById(id)
      if (!user) {
        return res
          .status(404)
          .json({ data: `Error: User with id ${id} does not exist` })
      }
      return res.status(200).json({ data: user })
    } catch (err) {
      return res
        .status(500)
        .json({ data: 'Error: Retrieving user failed' })
    }
  }

/* 
@Description: Filter users by name or email 
@Route: users/filter/:name, users/filter/:email 
@Access: Public 
*/ 
export const filterUsers = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const { name, email } = req.params
      const user = await userModel.find({$or:[{ name: name },{ email: email }]})
      if (!user) {
        return res
          .status(404)
          .json({ data: `Error: User with specified parameters does not exist` })
      }
      return res.status(200).json({ data: user })
    } catch (err) {
      return res
        .status(500)
        .json({ data: 'Error: Retrieving user failed' })
    }
  }

/*
@Description: Create a user
@Route: users/
@Access: Private
*/
export const createUser = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const { name, email, password } = req.body
    const user = new userModel({
      name,
      email,
      password
    })
    try {
      const newUser = await user.save()
      return res.status(201).json({ data: newUser })
    } catch (err) {
      return res
        .status(500)
        .json({ data: 'Error: Creation of user failed' })
    }
  }
  


/*
@Description: Update a user using a specific Id
@Route: users/update/:id
@Access: Private
*/
export const updateUser = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const { id } = req.params
      const { name, email, password } = req.body
      const user = await userModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          password
        },
        { new: true, runValidators:true, }
      )
      if (!user) {
        return res.status(404).json({
          message: `Error: User with id number ${id} does not exist`
        })
      }
      return res.status(201).json({ data: user })
    } catch (e) {
      return res
        .status(500)
        .json({ data: 'Error: User update operation failed' })
    }
  }


/*
@Description: Delete a user using a specific Id
@Route: users/delete/:id
@Access: Private
*/
export const deleteUser = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try {
      const { id } = req.params
      const user = await userModel.findByIdAndDelete({ _id: id })
      if (!user) {
        return res.status(404).json({
          message: `Error: User with id number ${id} does not exist`
        })
      }
      return res.status(201).json({ data: 'User deleted successfully' })
    } catch (e) {
      return res
        .status(500)
        .json({ data: 'Error: User delete operation failed' })
    }
  }
