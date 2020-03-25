const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { loadFilesAsync } = require("@graphql-toolkit/file-loading");
const { join } = require("path");
const {
  mergeTypeDefs,
  mergeResolvers
} = require("@graphql-toolkit/schema-merging");
const app = express();

(async () => {
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

    tracing: true,
    formatError: err => {
      return new Error(err.toString());
      // Don't give the specific errors to the client.    if (err.message.startsWith("Database Error: ")) {      return new Error('Internal server error');    }        // Otherwise return the original error.  The error can also    // be manipulated in other ways, so long as it's returned.
      return err;
    }
  });

  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
