const jwt = require("jsonwebtoken");

module.exports = {
  generate: (user, expiresIn = 60 * 60 * 24) => {
    return jwt.sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn
    });
  },
  verify: async token => {
    return await jwt.verify(token, process.env.SECRET_KEY);
  }
};
