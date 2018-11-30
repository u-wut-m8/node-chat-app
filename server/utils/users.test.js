const expect = require('expect');
const {Users} = require("./users.js");

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: "potato",
      room: "Node Course"
    }, {
      id: '2',
      name: "banana",
      room: "React Course"
    }, {
      id: '3',
      name: "lmao",
      room: "Node Course"
    }];
  });

  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: "526",
      name: "potato",
      room: "XD"
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toMatchObject([resUser]);
  });

  it("should find user", () => {
    var userId = '2', user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it("should not find user", () => {
    var userId = '99', user = users.getUser(userId);
    expect(user).toBeFalsy();
  });

  it("should remove a user", () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it("should return names for node course", () => {
    var userList = users.getUserList("Node Course");
    expect(userList).toMatchObject(["potato", "lmao"]);
  });
});
