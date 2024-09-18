const BBQPackage = require('../models/BBQPackage');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    getBBQPackages: async () => {
      return BBQPackage.find();
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    placeOrder: async (parent, { packageId }) => {
      const order = new Order({ package: packageId });
      await order.save();
      return order;
    },
  },
};

module.exports = resolvers;
