import './common/env'
import * as os from 'os'
import app from './app'
import logger from './common/logger'
// import cron from 'node-cron'

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  logger.info(
    `up and running in ${
      process.env.NODE_ENV || 'development'
    } @: ${os.hostname()} on port ${PORT}`
  )
})

// cron.schedule('0 0 18 * * 6', () => {
//   console.log('---------------------------------------');
//   console.log('running a task every saturday at 6:00pm');
//   console.log('---------------------------------------');
//   // TODO: send a notification to all users with a new email notification
// });
