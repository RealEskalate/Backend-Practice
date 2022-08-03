import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnect, connect } from "mongoose";

let mongoServer: { getUri: () => any; stop: () => any };

export const connect = async () => {
  await disconnect();

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
  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany();
  }
};

export const disconnectDB = async () => {
  mongoose.disconnect();
  await mongoServer.stop();
};
