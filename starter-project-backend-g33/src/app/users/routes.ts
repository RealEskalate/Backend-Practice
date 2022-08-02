import { Router } from 'express'
import controller from './controller'
import { validateJoi, Schemas } from '../../middlewares/userJoi'

const router = Router()

// TODO: document with docstring
router.get('/', controller.getAllUser)
router.get('/:id', controller.getUser)
router.post('/create', validateJoi(Schemas.user.create), controller.create)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

export = router
