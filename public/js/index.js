var socket = io();                     //Tells server to open up connection between itself and client, and maintain running the socket.
socket.on("connect", () => {
  console.log("Connected to server.");
});
socket.on("disconnect", () => {
  console.log("Disconnected from server.");
});
socket.on("newMessage", function (message) {
  console.log("New message ", message);
  var li = jQuery("<li></li>");
  li.text(`${message.from} : ${message.text}`);
  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function (e) {
  e.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, function () {

  });
});
