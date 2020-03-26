// const express = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { loadFilesAsync } = require("@graphql-toolkit/file-loading");
const { join } = require("path");
const SQL = require("sql-template-strings");
const Token = require("./lib/Token");
const {
  mergeTypeDefs,
  mergeResolvers
} = require("@graphql-toolkit/schema-merging");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./lib/db");
const dataLoaders = require("./dataLoaders/index");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//Public Dir
app.use(express.static("public"));

(async () => {
  const db = await dbConnect();

  const [typeDefs, resolvers] = await Promise.all([
    loadFilesAsync(join(__dirname, "graphql", "**", "*.graphql")).then(
      mergeTypeDefs
    ),
    loadFilesAsync(join(__dirname, "graphql", "**", "*.js")).then(
      mergeResolvers
    )
  ]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      let user = null;
      const token = req.headers.authorization || "";
      if (token && token !== "null") {
        user = await Token.verify(token);
        if (!user) throw new AuthenticationError("You must be logged in!");
      }
      return { db, activeUser: user, dataLoaders: dataLoaders(db) };
    },
    tracing: true,
    formatError: err => {
      return new Error(err.toString());
    }
  });

  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
})();
