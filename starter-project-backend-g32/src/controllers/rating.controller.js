const Rating = require("../models/rating");
const { crudControllers } = require("../utils/ratingCRUD");

module.exports = crudControllers(Rating);