var socket = io();                     //Tells server to open up connection between itself and client, and maintain running the socket.
socket.on("connect", () => {
  console.log("Connected to server.");

  // socket.emit("createEmail", {
  //   to: "john@doe.com",
  //   text: "Hello there!"
  // });

  socket.emit("createMessage", {
    to: "pakalu@papito.com",
    text: "Yup, that works for me!"
  });
});
socket.on("disconnect", () => {
  console.log("Disconnected from server.");
});
// socket.on("newEmail", function (email) {
//   console.log("New email.", email);
// });
socket.on("newMessage", function (message) {
  console.log("New message ", message);
});
