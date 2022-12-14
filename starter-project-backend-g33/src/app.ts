import express, {
  Application,
  Request,
  Response,
  NextFunction,
  json
} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import startDB from './services/db'
import routes from './common/routes'
import errorHandler from './middlewares/errorHandler'

const app: Application = express()

app.disable('x-powered-by')
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb'
  })
)
app.use(express.json())

app.get('/', (req: Request, res: Response) =>
  res.json({ 'health-check': 'OK: top level api working', user: req.body.user })
)

startDB()
app.use('/v1/', routes)
app.use(errorHandler)

export default app
