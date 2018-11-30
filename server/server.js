const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require("./utils/validation.js");
const {Users} = require("./utils/users.js");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;                                               //For both Heroku and local machine compatibility.

var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);
var users = new Users();

io.on("connection", (socket) => {                                                    //on() registers an event listener.
  console.log("New user connected.");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room))
      return callback("Name and room name are required.");
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat application."));
    socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} user joined.`));
    callback();
  });

  socket.on("createMessage", (createMessage, callback) => {
    console.log("createMessage", createMessage);
    io.emit("newMessage", generateMessage(createMessage.from, createMessage.text));
    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
  });

  socket.on("disconnect", () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the group.`));
    }
  });

});
server.listen(port, () => {
  console.log(`Server is up on ${port}.`);
});
