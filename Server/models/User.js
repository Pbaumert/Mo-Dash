const { GraphQLString, GraphQLObjectType } = require('graphql');
const User = require('./User');
const jwt = require('jsonwebtoken');

// Create User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

// Queries
const userQueries = {
  // Add more queries here like getUserById or getUsers
};

// Mutations (Sign Up, Login)
const userMutations = {
  signup: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const user = new User(args);
      await user.save();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { ...user._doc, token };
    }
  },
  login: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const user = await User.findOne({ email: args.email });
      if (!user || !(await bcrypt.compare(args.password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { ...user._doc, token };
    }
  }
};

module.exports = { userQueries, userMutations };
