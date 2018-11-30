const expect = require("expect");
const {isRealString} = require("./validation.js");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    var test = isRealString(15);
    expect(test).toBe(false);
  });
  it("should reject string with only spaces", () => {
    var test = isRealString("                             ");
    expect(test).toBe(false);
  });
  it("should allow string with non-space characters", () => {
    var test = isRealString("        potato banana   ");
    expect(test).toBe(true);
  });
});
