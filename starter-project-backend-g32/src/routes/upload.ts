import { Router } from 'express'
import upload from "../utils/multer"

import {
    deleteUserProfile, 
    updateUserProfile, 
    deleteArticleMedia, 
    updateArticleMedia
} from '../controllers/upload'

const router = Router()

router.route('/userProfile/:id').put(upload.single('image'),updateUserProfile).delete(deleteUserProfile)
router.route('/articleMedia/:id').put(upload.single('image'),updateArticleMedia).delete(deleteArticleMedia)

export default router