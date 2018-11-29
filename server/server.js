const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;                                               //For both Heroku and local machine compatibility.

var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);

io.on("connection", (socket) => {                                                    //on() registers an event listener.
  console.log("New user connected.");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat application.",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined the chat group.",
    createdAt: new Date().getTime()
  });

  socket.on("createMessage", (createMessage) => {
    console.log("createMessage", createMessage);
    io.emit("newMessage", {
      from: createMessage.from,
      text: createMessage.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit("newMessage", {
    //   from: createMessage.from,
    //   text: createMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  // socket.emit("newMessage", {
  //   from: "xyz@abc.com",
  //   body: "Hello there!",
  //   createdAt: new Date().toString()
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });

});
server.listen(port, () => {
  console.log(`Server is up on ${port}.`);
});
