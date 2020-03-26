const SQL = require("sql-template-strings");

module.exports = {
  Post: {
    user: async ({ user }, args, { db, dataLoaders }) => {
      const { getUser } = dataLoaders.users;
      return getUser.load(user);
    }
  }
};
