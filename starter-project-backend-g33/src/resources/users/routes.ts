import { Router } from 'express'
import userController from './controller'
import { validateJoi, Schemas } from '../../middlewares/validateJoi'

const router = Router()

router
  .route('/')
  .get(userController.getAllUser)
  .post(validateJoi(Schemas.user.create), userController.create)

router
  .route('/:id')
  .get(userController.getUser)
  .put(validateJoi(Schemas.user.create), userController.updateUser)
  .delete(userController.deleteUser)

router.route('/login').post(userController.login)

export = router
