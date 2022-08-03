import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnect, connect, connection } from "mongoose";

let mongoServer: { getUri: () => any; stop: () => any };

export const connectDB = async () => {
  await disconnect();

  mongoServer = await MongoMemoryServer.create();
  const URI = await mongoServer.getUri();
  connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export const clearDB = async () => {
  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.getMany();
  }
};

export const disconnectDB = async () => {
  disconnect();
  await mongoServer.stop();
};
