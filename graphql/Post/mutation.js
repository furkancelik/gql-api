const SQL = require("sql-template-strings");

module.exports = {
  Mutation: {
    createPost: async (_, { data }, { db, activeUser }) => {
      if (!activeUser) throw new Error("You are not authenticated!");
      const result = await db.query(
        SQL`INSERT INTO posts ("title","description","user") VALUES (${data.title},${data.description},${activeUser.id}) RETURNING *`
      );
      return result.rows[0];
    }
  }
};
