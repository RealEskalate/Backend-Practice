const mongoose = require("mongoose");
const appCreator = require("./appCreator");

const port = 3000;
const host = "127.0.0.1";
const dbUrl = "mongodb://localhost:27017/blog";

const app = appCreator.createApp();

const start = async () => {
  await mongoose.connect(dbUrl, { useNewUrlParser: true });
  try {
    app.listen(port, host, () => {
      console.log(`Server running on http://${host}:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { start };