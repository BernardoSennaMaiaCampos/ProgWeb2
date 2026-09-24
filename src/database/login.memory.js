const bcrypt = require("bcryptjs");


const users = [
  {
    id: 1,
    username: "vitor",
    role: "user",
    passwordHash: bcrypt.hashSync("123", 10),
  },
  {
    id: 2,
    username: "admin",
    role: "admin",
    passwordHash: bcrypt.hashSync("123", 10),
  },
];

function findByUsername(username) {
  return users.find((u) => u.username === username);
}

module.exports = { findByUsername };