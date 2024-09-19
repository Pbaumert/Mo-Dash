const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./Schema');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to handle URL-encoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();

// Static assets for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}
