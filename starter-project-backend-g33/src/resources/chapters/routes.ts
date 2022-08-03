import { Router } from 'express'
import chapterController from './controller'

const router = Router()

router
  .route('/')
  .get(chapterController.getAllChapters)
  .post(chapterController.createChapter)

router
  .route('/:id')
  .get(chapterController.getChapter)
  .put(chapterController.updateChapter)
  .delete(chapterController.disableChapter)


export default router