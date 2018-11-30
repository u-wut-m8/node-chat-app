const moment = require("moment");

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()                                               //Same as new Date().getTime()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.openstreetmap.org/search?query=${latitude}, ${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
