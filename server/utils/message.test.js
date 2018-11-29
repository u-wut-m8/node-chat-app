const expect = require("expect");

const {generateMessage} = require("./message.js");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Tony", text = "Hi, there!";
    var message = generateMessage(from, text);
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe("number");
  });
});
