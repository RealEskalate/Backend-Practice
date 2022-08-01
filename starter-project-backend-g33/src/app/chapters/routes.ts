import { Router } from 'express'
import chapterController from './controller'

const router = Router()

router.get('/', chapterController.getAllChapters)
router.get('/:id', chapterController.getChapter)
router.put('/:id', chapterController.updateChapter)
router.post('create', chapterController.createChapter)
router.delete('/remove', chapterController.disableChapter)

export default router