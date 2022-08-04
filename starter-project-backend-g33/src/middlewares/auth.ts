// auth middleware with jwt
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import User from '../resources/users/model'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'secret')
      const user = await User.findById(decoded.id)
      if (!user) {
        return res.status(401).json({ message: 'Not authorized' })
      }
      req.user = user // TODO: fix ts-lint issue here
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized' })
    }
  } else {
    return res.status(401).json({ message: 'Not authorized' })
  }
}
