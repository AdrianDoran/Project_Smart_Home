const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String,
    datetime: Array()
}));