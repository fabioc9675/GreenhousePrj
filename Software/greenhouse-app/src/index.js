const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express(); // server
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Database connection
// const { mongoose } = require("./database/database");

// URI connection
const URI = process.env.REACT_APP_URI; // environment variable
const port = process.env.PORT || 3000;
const connection = mongoose.connection;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Settings
app.set("port", port); // takes the port provided for the server or other

// Middlewares
app.use(morgan("dev")); // creates a log for clients that request access to the app
app.use(express.json()); // every data that arrives to the server enters to this and it verifies if the data is a json
app.use(cors());

// Routes
app.use("/api/greenhouse", require("./routes/greenhouse.routes")); // adding prefix to the route

// Static files
// console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public"))); // adding prefix to the route

// connect to the database
mongoose
  .connect(URI) // create connection to mongodb database
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.error(err));

// socket initialization
io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

// Starting the server
server.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

// initialization of collection watch
connection.once("open", () => {
  console.log("MongoDB database connected");

  // Setting change streams in the database
  console.log("Setting change streaming");
  const greenhouseChangeStream = connection.collection("greenhouses").watch();

  greenhouseChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        console.log("data inserted");
        io.emit("message", `message emited ${change.fullDocument._id}`);
    }
  });
});
