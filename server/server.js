const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;                                               //For both Heroku and local machine compatibility.

var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on("connection", (socket) => {                                                    //on() registers an event listener.
  console.log("New user connected.");

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat application."));

  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined."));

  socket.on("createMessage", (createMessage, callback) => {
    console.log("createMessage", createMessage);
    io.emit("newMessage", generateMessage(createMessage.from, createMessage.text));
    callback();
    // socket.broadcast.emit("newMessage", {
    //   from: createMessage.from,
    //   text: createMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });

});
server.listen(port, () => {
  console.log(`Server is up on ${port}.`);
});
