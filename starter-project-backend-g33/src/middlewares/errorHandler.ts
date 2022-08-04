import { Request, Response, NextFunction } from 'express'
import logger from '../common/logger'
import { CustomError } from './errorModel'

export default function errorHandler(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err

  if (!(err instanceof CustomError)) {
    logger.error(err.stack)
    customError = new CustomError(
      'Oh no, this is embarrassing. We are having internal troubles'
    )
  }

  // we are not using the next function to prevent from triggering
  // the default error-handler. However, make sure you are sending a
  // response to client to prevent memory leaks in case you decide to
  // NOT use, like in this example, the NextFunction .i.e., next(new Error())
  res.status((customError as CustomError).status).send(customError)
}
