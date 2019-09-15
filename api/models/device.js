const mongoose = require('mongoose');
module.exports = mongoose.model('Device', new mongoose.Schema({
  email: String,
  name: String,
  id: Number,
  data: Array() // data to the collection, this can contain information like datetime stamp, lat and lon, tag number.
}));