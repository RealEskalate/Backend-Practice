import { Router } from 'express'
import userController from './controller'
import { validateJoi, Schemas } from '../../middlewares/userJoi'

const router = Router()

router
  .route('/')
  .get(userController.getAllUser)
  .post( validateJoi(Schemas.user.create), userController.create)


router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)



export = router
