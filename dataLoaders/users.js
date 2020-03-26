const DataLoader = require("dataloader");
const SQL = require("sql-template-strings");

module.exports = db => ({
  getUser: new DataLoader(async ids => {
    const result = await db.query(
      SQL`SELECT * FROM users WHERE id = ANY (${ids})`
    );
    return ids.map(id => result.rows.find(row => row.id === id));
  })
});
