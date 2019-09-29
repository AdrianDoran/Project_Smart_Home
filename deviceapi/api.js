const Device = require('./models/device');
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

var cards = [];
var touch = [];

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });


app.post('/api/update', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  data["time"] = Date.now().toString();
  const isTouched = touchCard(data.cardID);
  data["entry"] = isTouched;
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
    }
  );
});

function touchCard(card)
{
  for(let i = 0; i < cards.length; i++)
  {
    if(cards[i] == card)
    {
      if(touch[i] == "false")
      {
        touch[i] = "true";
        return "true";
      }
      else{
        touch[i] = "false";
        return "false";
      }
    }
  }
  cards.push(card);
  touch.push("true");
}