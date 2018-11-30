var socket = io();                     //Tells server to open up connection between itself and client, and maintain running the socket.
socket.on("connect", () => {
  console.log("Connected to server.");
});
socket.on("disconnect", () => {
  console.log("Disconnected from server.");
});
socket.on("newMessage", function (message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  // var li = jQuery("<li></li>");
  // li.text(`${message.from} ${formattedTime} : ${message.text}`);
  // jQuery("#messages").append(li);
});

socket.on("newLocationMessage", message => {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  // var li = jQuery("<li></li>");
  // var a = jQuery("<a target=\"_blank\">My current location</a>");
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr("href", message.url);
  // li.append(a);
  // jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function (e) {
  e.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, function () {
    jQuery("[name=message]").val("");
  });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function () {
  if (!navigator.geolocation)
    return alert("Geolocation not supported by your browser.");
  locationButton.attr("disabled", "disabled").text("Sending location...");
  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.removeAttr("disabled").text("Send location!");
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.removeAttr("disabled").text("Send location!");
    alert("Unable to fetch location.");
  });
});
