import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../../common/dal'
import Comment from './model'

const commentDal = dataAccessLayer(Comment)

const getAllComments = (req: Request, res: Response, next: NextFunction) => {
  const articleID = req.params.id
  if (articleID) {
    const filter = { articleId: articleID }
    commentDal
      .getMany(filter)
      .then((data: any) => {
        if (data.length == 0) {
          res.status(204).send()
        }
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  } else {
    res.status(400)
    throw new Error('Missing article id')
  }
}

const getComment = (req: Request, res: Response, next: NextFunction) => {
  commentDal
    .getMany({ articleId: req.params['id'] })
    .then((data) => {
      if (!data) {
        res.status(204).send()
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
    throw 'Please enter a comment'
  } else {
    commentDal
      .updateOne(newComment, newComment.id)
      .then((data) => {
        if (!data) {
          throw 'No comment with this ID'
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
        throw 'Could not create the comment'
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
        throw 'Could not delete comment'
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
