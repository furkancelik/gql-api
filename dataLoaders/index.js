const users = require("./users");
const posts = require("./posts");

module.exports = db => ({
  users: users(db),
  posts: posts(db)
});
