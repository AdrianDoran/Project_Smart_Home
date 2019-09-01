const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/users/user.model')
};