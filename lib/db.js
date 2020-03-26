const { Client } = require("pg");

module.exports = async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "serverdb",
    password: "123456",
    port: 5432
  });
  await client.connect();
  return client;
};
