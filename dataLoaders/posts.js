const DataLoader = require("dataloader");
const SQL = require("sql-template-strings");

module.exports = db => ({
  getPosts: new DataLoader(async ids => {
    const result = await db.query(
      SQL`SELECT * FROM posts WHERE "user" = ANY(${ids})`
    );
    return Promise.all(
      ids.map(async id => result.rows.filter(row => row.user === id))
    );
  })
});
