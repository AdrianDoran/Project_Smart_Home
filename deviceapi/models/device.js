const mongoose = require('mongoose');
module.exports = mongoose.model('Device', new mongoose.Schema({
  email: String,
  name: String,
  id: Number,
  data: [{
    lat: Number,
    lon: Number,
    time: String
}]
}));