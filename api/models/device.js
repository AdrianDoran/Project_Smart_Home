const mongoose = require('mongoose');
module.exports = mongoose.model('Device', new mongoose.Schema({
  email: String,
  name: String,
  id: Number,
  data: [{
    cardID: String,
    lat: Number,
    lon: Number,
    time: String,
    entry: String
}] // data to the collection, this can contain information like datetime stamp, lat and lon, tag number.
}));