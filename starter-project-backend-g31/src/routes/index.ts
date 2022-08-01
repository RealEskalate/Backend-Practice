import * as express from 'express';
const indexRouter = express.Router();

/*
 * Returns API status
 * @route GET /
 * @group Index - API service status
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 */
indexRouter.get('/', async function(req: express.Request, res: express.Response, next) {
  return res.json({
    title: 'Blog API',
    version: '1.0.0',
    description: 'Services for managing blog applications'
  })
});

export const indexRoute = indexRouter; 