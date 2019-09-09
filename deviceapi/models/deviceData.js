const mongoose = require('mongoose');
module.exports = mongoose.model('DeviceData', new mongoose.Schema( {
    id: Number,
    data: String // Considering whether this should be a string or an array of strings.
}));