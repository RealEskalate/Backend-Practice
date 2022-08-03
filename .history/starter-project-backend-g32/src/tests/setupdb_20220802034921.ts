import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod = null;
let mongoServer: { getUri: () => any; stop: () => any };

export const connect = async () => {
  
    let dbUrl = "mongodb://localhost:27017/usersdb";
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    

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
