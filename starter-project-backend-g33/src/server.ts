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

// SEND AN EMAIL TO ALL USERS TO JOIN WEEKLY CONTEST ON CODE FORCES

// const filter = { isActive: true }
// UserDAL.getMany(filter)
//   .then((data: any) => {
//     if (data.length == 0) {
//       throw new CustomError('No User Found', 404)
//     }
//     data.forEach((user: any) => {
//       const url = `https://codeforces.com/contest/{contestId}`
//       const email = user.email
//       const subject = 'Get Back to Grind: Time for your weekly contest'
//       const text = `Please click on the link below to start grinding your weekly contest: ${url}`
//       const html = `<p>Please click on the link below to start grinding your code: <a href="${url}">${text}</a></p>`

//       sendEmail(email, subject, text, html, token)
//     }
//   }
// });
