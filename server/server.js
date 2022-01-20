const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { resolvers, typeDefs } = require('./schemas'); //use index file in schemas

async function startServer() {
  const server = new ApolloServer({
      typeDefs,
      resolvers,
  });
  await server.start();
  //Initialize Express
  const app = express();
  const PORT = process.env.PORT || 3005;

  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`gql path is ${server.graphqlPath}`);
});

}
startServer();


