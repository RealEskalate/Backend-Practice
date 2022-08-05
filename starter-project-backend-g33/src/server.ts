import './common/env'
import * as os from 'os'
import app from './app'
import logger from './common/logger'

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  logger.info(
    `up and running in ${
      process.env.NODE_ENV || 'development'
    } @: ${os.hostname()} on port ${PORT}`
  )
})
