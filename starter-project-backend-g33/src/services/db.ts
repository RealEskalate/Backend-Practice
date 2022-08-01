import mongoose from 'mongoose';

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.Promise = global.Promise;

// Get current connected Database
const db = mongoose.connection;

// Notify on error or success
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Connected to the database instance!'));

// a singleton export
export default {
  User: require('../app/users/model'),
  Comment: require('../app/comments/model'),
  Article: require('../app/articles/model'),
  Chapter: require('../app/chapters/model'),
};
