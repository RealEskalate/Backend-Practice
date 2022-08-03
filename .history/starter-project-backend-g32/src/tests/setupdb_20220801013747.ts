import { MongoMemoryServer } from "mongodb-memory-server";
const mongoose = require("mongoose");

let mongoServer: { getUri: () => any; stop: () => any };


export const connect = async () => {
  await mongoose.disconnect()
  const mongodbMemoryServerOptions = {
    binary: {
      version: '5.0.6',
      skipMD5: true
    },
    autoStart: true,
    instance: {}
  }
  const mongoServer = await MongoMemoryServer.create(mongodbMemoryServerOptions)
  const URI = mongoServer.getUri()

  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true
  })
  return mongoServer
}

export const closeDatabase = async (mongoServer: MongoMemoryServer) => {
  await mongoose.disconnect()
  await mongoose.connection.close()
  await mongoServer.stop()
}

