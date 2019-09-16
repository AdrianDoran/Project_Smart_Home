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
    const {id, data} = req.body;
        deviceDataCheck = Device.findOne({id}).then(doc => {
            if(!doc){return res.send("Device ID not found in database.")}
            else
            {
                doc.data.push({data});
                doc.save();
                res.send("Published.")
            }
        })
   .catch(err =>{
      return err
    });
  });