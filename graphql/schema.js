const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { userQueries, userMutations } = require('./user');
const { orderQueries, orderMutations } = require('./order');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...userQueries,
    ...orderQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...orderMutations
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
