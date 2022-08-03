import { MongoMemoryServer } from "mongodb-memory-server";
const mongoose = require("mongoose");

let mongoServer: {
  [x: string]: any; getUri: () => any; stop: () => any 
};

export const connect = async () => {
  await mongoose.disconnect() 
  
  mongoServer = await MongoMemoryServer.create();
  const URI = mongoServer.getUri();

  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export const clear = async () => {
<<<<<<< HEAD:starter-project-backend-g31/src/__tests__/setupdb.ts
  const collections = await mongoose.connection.db.collection;
=======
  const collections = await mongoose.connection.collections;
>>>>>>> 594f9d6b8aeae2e5c67f1d937aa9e2b763a25295:starter-project-backend-g31/src/tests/setupdb.ts

  for (let collection of collections) {
    await collection.deleteMany({});
  }
};

export const disconnect = async () => {
  mongoose.disconnect();
  await mongoServer.stop();
};
