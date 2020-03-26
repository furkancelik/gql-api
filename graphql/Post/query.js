const SQL = require("sql-template-strings");
module.exports = {
  Query: {
    posts: async (_, __, { db }) => {
      const result = await db.query(SQL`SELECT * FROM posts`);
      return result.rows;
    },
    post: async (_, { id }, { db }) => {
      const result = await db.query(SQL`SELECT * FROM posts WHERE id=${id}`);
      return result.rows[0];
    }
  }
};
