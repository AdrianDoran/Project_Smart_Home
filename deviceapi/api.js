const Device = require('./models/device');
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  

  app.post('/api/update', (req, res) => {
    const id = req.params.id;
    const requestString = toString(req.body);
    const data = JSON.parse(requestString);
    data.time = Date.now().toString();

    Device.findOneAndUpdate(
      id,
      { $push: {"data": data}},
      {  safe: true, upsert: true},
        function(err, data) {
          if(err){
           console.log(err);
           return res.send(err);
          }
           return res.json(data);
       });
        });

