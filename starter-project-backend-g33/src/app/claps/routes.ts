import { Router } from 'express'
import ClapController from './controller'

const router = Router()

router.get('/', ClapController.getAllClaps)
router.get('/:id', ClapController.getClap)
router.put('/:id', ClapController.updateClap)
router.post('/', ClapController.createClap)
router.delete('/:id', ClapController.deleteClap)

export default router
