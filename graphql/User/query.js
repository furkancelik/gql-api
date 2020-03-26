const SQL = require("sql-template-strings");
module.exports = {
  Query: {
    users: async (_, __, { db }) => {
      const result = await db.query(SQL`SELECT * FROM users`);
      return result.rows;
    },
    user: async (_, { id }, { db }) => {
      const result = await db.query(SQL`SELECT * FROM users WHERE id=${id}`);
      return result.rows[0];
    }
  }
};
