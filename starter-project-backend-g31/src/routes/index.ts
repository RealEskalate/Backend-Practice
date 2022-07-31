import * as express from 'express';
const route = express.Router();

/*
 * Returns API status
 * @route GET /
 * @group Index - API service status
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 */
route.get('/', async function(req: express.Request, res: express.Response, next) {
  return res.json({
    title: 'Blog API',
    version: '1.0.0',
    description: 'Services for managing blog applications'
  })
});

module.exports = route;
