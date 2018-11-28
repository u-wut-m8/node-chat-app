const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;                                                //For both Heroku and local machine compatibility.

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on ${port}.`);
});
