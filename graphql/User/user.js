const SQL = require("sql-template-strings");

module.exports = {
  User: {
    posts: async (parent, args, { db, dataLoaders }) => {
      const { getPosts } = dataLoaders.posts;
      return getPosts.load(parent.id);
    }
  }
};
