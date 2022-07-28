import { Response, Router } from 'express';

const router: Router = Router();

import userRouter from './app/users/routes';
import commentRouter from './app/comments/routes';
import articleRouter from './app/articles/routes';
import chapterRouter from './app/chapter/routes';

router.get('health-check', (_request, Response) =>
  Response.json({ success: true })
);

router.use('/users', userRouter);
router.use('/comments', commentRouter);
router.use('/articles', articleRouter);
router.use('/chapters', chapterRouter);

export = router;
