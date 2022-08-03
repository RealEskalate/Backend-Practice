const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ratingRoutes = require("./routes/rating.routes");

function createApp(){
    const app = express();
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use("/api/v1/rating", ratingRoutes);

    return app;
}

module.exports = { createApp };