import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod = null
let mongoServer: { getUri: () => any; stop: () => any };

export const connect = async () => {
  try {
    let dbUrl = 'mongodb://username:password@localhost:27017';
    if (process.env.NODE_ENV === 'test') {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export const clear = async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany();
  }
};

export const disconnect = async () => {
  mongoose.disconnect();
  await mongoServer.stop();
};
