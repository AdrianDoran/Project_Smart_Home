const Device = require('./models/device');
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

var cards = [];
var touch = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.options('*', cors());

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post('/api/update', (req, res) => {
  const id = req.query.id;
  const dataNew = req.body;
  const isTouched = touchCard(dataNew.cardID);
  dataNew["time"] = Date.now().toString();
  dataNew["entry"] = isTouched;

  Device.findOneAndUpdate({id},
    { $push: {"data": dataNew}},
    {  safe: true, upsert: true},
    err => {
      if(err){
        console.log(err);
        return res.send(err);
      }
      return res.json(id);
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