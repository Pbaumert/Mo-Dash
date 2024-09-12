const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const schema = require('./graphql/schema'); // GraphQL schema
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// JWT Middleware for user authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (err) {
      console.log('Invalid Token');
    }
  }
  next();
};

app.use(authenticate);

// GraphQL API Route
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true // Enable GraphiQL for testing
}));

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to local MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

