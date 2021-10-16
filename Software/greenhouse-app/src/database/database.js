const mongoose = require("mongoose");
require("dotenv").config();

// URI connection
const URI = process.env.REACT_APP_URI; // environment variable

mongoose
  .connect(URI) // create connection to mongodb database
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.error(err));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");

  // Setting change streams in the database
  console.log("Setting change streams");
  const greenhouseChangeStream = connection.collection("greenhouses").watch();

  greenhouseChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        console.log("data inserted");
    }
  });
});

module.exports = mongoose;
