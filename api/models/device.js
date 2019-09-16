const mongoose = require('mongoose');
module.exports = mongoose.model('Device', new mongoose.Schema({
  email: String,
  name: String,
  id: Number,
  data: [{
    lat: Number,
    lon: Number,
    time: String
}] // data to the collection, this can contain information like datetime stamp, lat and lon, tag number.
}));