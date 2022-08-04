import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import IUserInterface from '../resources/users/interface'

export const validateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)
    } catch (error) {
      return res.status(422).json({ error })
    }
    next()
  }
}
// create validate schema
export const Schemas = {
  user: {
    create: Joi.object<IUserInterface>({
      firstName: Joi.string(),
      middleName: Joi.string(),
      lastName: Joi.string(),
      username: Joi.string().min(4).max(10),
      email: Joi.string().email(),
      password: Joi.string().alphanum().min(6),
      bio: Joi.string().min(10).max(300),
      profileImage: Joi.string().uri(),
      isActive: Joi.number(),
      chapter: Joi.string().id()
    })
  }
}
