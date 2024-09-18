const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type BBQPackage {
    _id: ID
    name: String
    price: Float
  }

  type User {
    _id: ID
    username: String
  }

  type Query {
    getBBQPackages: [BBQPackage]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    placeOrder(packageId: ID!): Order
  }

  type Auth {
    token: String
    user: User
  }

  type Order {
    _id: ID
    package: BBQPackage
  }
`;

module.exports = typeDefs;
