import { MongoMemoryServer } from "mongodb-memory-server";
import { UserProfile } from "../models/UserProfile";

const mongoose = require("mongoose");

let mongoServer: { getUri: () => any; stop: () => any };

export const connect = async () => {
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  const URI = await mongoServer.getUri();
  

  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export const clear = async () => {
  const collections = await mongoose.connection.collections;
  await UserProfile.deleteMany()
  for (let collection of collections) {
    await collection.deleteMany();
  }
};

export const disconnect = async () => {
  mongoose.disconnect();
  await mongoServer.stop();
};
