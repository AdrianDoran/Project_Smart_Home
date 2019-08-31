const User = require('./models/user');
const express = require('express');
var bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(`${__dirname}/public`));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
/**
 * @api {get} /api/test Check if the api is up
 * @apiGroup Test
 *
 * @apiSuccess {String} The api is working.
 * @apiError {null} No response.
 */
app.get('/api/test', (req, res) => {
    res.send('The API is working!');
  });
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
/**
 * @api {get} /api/authenticate Check if angular frontend is sending our request.
 * @apiGroup Test
 *
 * @apiSuccess {String} Authentication request received..
 * @apiError {null} No response.
 */
app.get('/api/authenticate', (req, res) => {
    res.send("Authentication request recieved.");
})

