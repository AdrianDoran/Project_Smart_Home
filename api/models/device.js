const mongoose = require('mongoose');
module.exports = mongoose.model('Device', new mongoose.Schema({
  email: String,
  name: String,
  data: Array
}));