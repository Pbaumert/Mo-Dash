const mongoose = require('mongoose');

const BBQPackageSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const BBQPackage = mongoose.model('BBQPackage', BBQPackageSchema);

module.exports = BBQPackage;
