const mongoose = require('mongoose');
const logger = require("../utils/log/log.js");

mongoose.set('strictQuery', false);
const { MONGO_URI } = process.env;

const connectDB = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      logger.info("Successfully connected to database");
    })
    .catch((error) => {
      logger.info("Database connection failed. Exiting now...");
      logger.error(error);
      process.exit(1);
    });
};

module.exports = connectDB;
