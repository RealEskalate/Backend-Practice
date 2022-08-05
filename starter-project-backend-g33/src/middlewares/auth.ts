// auth middleware with jwt
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import dataAccessLayer from '../common/dal'
import User from '../resources/users/model'

const UserDAL = dataAccessLayer(User)

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1]
  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET)
      const user = await UserDAL.getManyUserSecured({ _id: decoded.id })
      if (!user) {
        return res.status(401).json({ message: 'Not authorized' })
      }

      req.body.user = user
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized' })
    }
  } else {
    return res.status(401).json({ message: 'Not authorized' })
  }
}
