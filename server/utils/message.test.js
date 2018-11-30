const expect = require("expect");

const {generateMessage, generateLocationMessage} = require("./message.js");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Tony", text = "Hi, there!";
    var message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe("number");
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = "Admin", latitude = 15, longitude = 19, url = `https://www.openstreetmap.org/search?query=${latitude}, ${longitude}`;
    var message = generateLocationMessage(from, latitude, longitude);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from, url});
  });
});
