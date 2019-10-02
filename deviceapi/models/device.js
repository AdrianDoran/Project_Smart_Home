const mongoose = require('mongoose');
module.exports = mongoose.model('Device', new mongoose.Schema({
  email: String,
  name: String,
  id: Number,
  data: [{
    cardName: String,
    cardID: String,
    lat: Number,
    lon: Number,
    time: String,
    entry: String
}]
}));