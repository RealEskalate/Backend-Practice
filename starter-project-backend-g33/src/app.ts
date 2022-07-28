import express, {
  Application,
  Request,
  Response,
  NextFunction,
  json,
} from 'express';
import cors from 'cors';
import logger from './common/logger';
import errorHandler from './middlewares/errorHandler';

import routes from './common/routes';

const app: Application = express();

app.disable('x-powered-by');
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  })
);
app.use(express.json());

app.get('/', (_request, Response) =>
  Response.json({ success: 'top level api working' })
);

// app.use('/v1/', routes);

app.use(errorHandler);

export default app;
