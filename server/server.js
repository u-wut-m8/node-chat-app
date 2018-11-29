const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;                                                //For both Heroku and local machine compatibility.

var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on("connection", (socket) => {                                                     //on() registers an event listener.
  console.log("New user connected.");

  socket.on("disconnect", (socket) => {
    console.log("User disconnected.");
  });
});
server.listen(port, () => {
  console.log(`Server is up on ${port}.`);
});
