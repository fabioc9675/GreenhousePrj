const mongoose = require("mongoose");
require("dotenv").config();

// URI connection
const URI = process.env.REACT_APP_URI; // environment variable
const port = process.env.PORT || 3000;

const connection = mongoose.connection;
const io = require("socket.io")("//localhost:3000");

mongoose
  .connect(URI) // create connection to mongodb database
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
