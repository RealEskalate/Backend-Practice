import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Comment from './model'
import { CustomError } from '../../middlewares/errorModel'

const commentDal = dataAccessLayer(Comment)

const getAllComments = (req: Request, res: Response, next: NextFunction) => {
  const articleID = req.params.id
  if (articleID) {
    const filter = { articleId: articleID }
    commentDal
      .getMany(filter)
      .then((data: any) => {
        if (data.length == 0) {
          throw new CustomError('No comments found', 404)
        }
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  } else {
    throw new CustomError('Missing article ID', 400)
  }
}

const getComment = (req: Request, res: Response, next: NextFunction) => {
  commentDal
    .getMany({ articleId: req.params['id'] })
    .then((data) => {
      if (!data) {
        throw new CustomError(
          'No comment found',
          404,
          'Could not fetch comment with this id'
        )
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const updateComment = (req: Request, res: Response, next: NextFunction) => {
  const newComment = req.body
  if (!newComment || !newComment.commentContent) {
    throw new CustomError(
      'Empty comment body.',
      400,
      'Please add some comment and comment content'
    )
  } else {
    commentDal
      .updateOne(newComment, newComment.id)
      .then((data) => {
        if (!data) {
          throw new CustomError('Cannot update comment with this id', 400)
        }
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
}

const createComment = (req: Request, res: Response, next: NextFunction) => {
  const newComment = req.body
  commentDal
    .createOne(newComment)
    .then((data) => {
      if (!data) {
        throw new CustomError('Cannot create comment', 400)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const deleteComment = (req: Request, res: Response, next: NextFunction) => {
  commentDal
    .deleteOne(req.params['id'])
    .then((data) => {
      if (!data) {
        throw new CustomError('Cannot delete comment', 400)
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

export default {
  getAllComments,
  getComment,
  updateComment,
  createComment,
  deleteComment
}
