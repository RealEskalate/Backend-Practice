import { Router } from 'express'
import userController from './controller'
import { validateJoi, Schemas } from '../../middlewares/validateJoi'
import { auth } from '../../middlewares/auth'

const router = Router()

router
  .route('/')
  .get(auth, userController.getAllUser)
  .post(validateJoi(Schemas.user.create), userController.create)

router
  .route('/:id')
  .get(auth, userController.getUser)
  .put(auth, validateJoi(Schemas.user.create), userController.updateUser)
  .delete(auth, userController.deleteUser)

router.route('/login').post(userController.login)

export = router
