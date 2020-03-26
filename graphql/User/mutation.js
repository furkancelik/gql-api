const SQL = require("sql-template-strings");
const Token = require("../../lib/Token");
module.exports = {
  Mutation: {
    register: async (_, { data }, { db }) => {
      const result = await db.query(
        SQL`INSERT INTO users (full_name,username,email,password) VALUES (${data.fullName},${data.username},${data.email},crypt(${data.password}, gen_salt('bf', 4))) RETURNING *`
      );
      return { token: Token.generate(result.rows[0]) };
    },
    login: async (_, { data }, { db }) => {
      const result = await db.query(
        SQL`SELECT * FROM users WHERE username=${data.username} AND password =  crypt(${data.password}, password)`
      );
      if (result.rowCount > 0) return { token: Token.generate(result.rows[0]) };
      throw new Error("User does not exists!");
    },
    updateProfile: async (_, { data }, { db, activeUser }) => {
      if (!activeUser) throw new Error("You are not authenticated!");
      const query = SQL`UPDATE users SET
               full_name=${data.fullName},
               email=${data.email},
               username=${data.username}`;
      if (data.password !== "") {
        query.append(SQL`,password=crypt(${data.password}, gen_salt('bf', 4))`);
      }
      query.append(SQL` WHERE id=${activeUser.id} RETURNING *`);

      const result = await db.query(query);
      return result.rows[0];
    }
  }
};
