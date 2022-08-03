import { Response, Router } from 'express'

const router: Router = Router()

// Route imports
import userRouter from '../resources/users/routes'
import commentRouter from '../resources/comments/routes'
import articleRouter from '../resources/articles/routes'
import chapterRouter from '../resources/chapters/routes'

// Higher route declaration
router.use('/users', userRouter)
router.use('/comments', commentRouter)
router.use('/articles', articleRouter)
router.use('/chapters', chapterRouter)

export = router
