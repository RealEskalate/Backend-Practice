import mongoose from 'mongoose'

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'

const startDB = () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  mongoose.Promise = global.Promise

  // Get current connected Database
  const db = mongoose.connection

  // Notify on error or success
  db.on('error', console.error.bind(console, 'connection error: '))
  db.once('open', () => {
    console.log('Connected to the database instance!')
  })
}

export default startDB

// a singleton export - silenced and used from model currently TODO: export from here centrally
// export default {
//   User: import('../app/users/model'),
//   Comment: import('../app/comments/model'),
//   Article: import('../app/articles/model'),
//   Chapter: import('../app/chapters/model'),
// };
