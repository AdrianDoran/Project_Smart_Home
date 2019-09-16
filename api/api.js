const Device = require('./models/device');
const User = require('./models/user');
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

var bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
mongoose.set('useFindAndModify', false); // Fixes deprecation warnings

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.options('*', cors());


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
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

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
 });
 /**
 * @api {post} /api/authenticate Authenticates user upon login.
 * @apiGroup User
 * @apiParam {JSON} Array of username and password.
 * 
 * @apiSuccess {String} Authenticated successfully.
 * @apiError {String} User not found, password incorrect, or raw error message.
 */
app.post('/api/authenticate', (req, res) => {
  const {email, password} = req.body;
  userCheck = User.findOne({email}).then(doc => {
    if(!doc){ return res.send('User not found.')}
    else if(doc.password == password) 
    { 
      const firstName = doc.firstName;
      const loginStamp = new Date();
      
      User.findOneAndUpdate({email}, 
        { $push: {datetime: { date: loginStamp.toDateString(), time: loginStamp.toTimeString() }}}, err => {
        if(err){ console.log(err) }
        else{ // DEBUG MODE
          //console.log(email);
          //console.log(loginStamp.toTimeString());
        }
      });
      return res.json({
        firstName,
        email
      });
    }
    else{
      return res.send("Password Incorrect");
    }
  }).catch(err =>{
    return err
  });
});
app.post('/api/devicedata', (req, res) => {
  const {id, device, data} = req.body;
  deviceCheck = DeviceData.findOne({id}).then(doc => {
    if(!doc){ return res.send('Device data not found.')}
    else 
    { 
      const data = doc.data;
      return res.json({
        id,
        data
     });
    }
  }).catch(err =>{
    return err
  });
});
/**
 * @api {post} /api/adddevice Posts new device to database.
 * @apiGroup Devices
 * @apiParam {JSON} Array of new device and properties.
 * 
 * @apiSuccess {String} Identifying success.
 * @apiError {String} Error message.
 */
app.post('/api/adddevice', (req, res) => {
  const { email, name, id } = req.body;
  const newDevice = new Device({
    email,
    name,
    id,
    data: ""
    // We need to have an mqtt server in here for the new device.
    // Device Verification is important here, will determine data capture types.
  });
  const newDeviceData = new DeviceData({
    id
  })

  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send(newDevice) && newDeviceData.save();  
});

    
 });
/**
 * @api {post} /api/register Adds new user to database.
 * @apiGroup User
 * @apiParam {JSON} Array of new user and properties.
 * 
 * @apiSuccess {String} Created new user.
 * @apiError {String} Username taken, or raw error message.
 */
app.post('/api/register', (req, res) =>{
  const {firstName, lastName, email, phone, password} = req.body;
  User.findOne({email}).then(doc => {
    if(doc){return res.send('Email already used.')}
    else{
      const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        password
       });
       console.log(newUser)
       newUser.save(err => {
        return err
        ? res.send(err)
        : res.json({
        success: true,
        message: 'Created new user'
        });
       });
    }
  }).catch(err => {
    return err;
  })
})
/**
 * @api {get} /api/devices Gets all devices from mongoDB
 * @apiGroup Devices
 *
 * @apiSuccess {JSON} Array of devices and attributes.
 * @apiError {String} Error message.
 */
app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    return err
      ? res.send(err)
      : res.send(devices);
}); });
/**
 * @api {post} Takes post from frontend and returns user devices.
 * @apiGroup Device
 * @apiParam {String} Email.
 * 
 * @apiSuccess {JSON} Devices.
 * @apiError {HTML} Raw error.
 */
 app.post('/api/devices', (req, res) => {
  const { email } = req.body;
  Device.find({ "email": email }, (err, devices) => {
    return err
      ? res.send(err)
      : res.send(devices);
  });
 });
/**
 * @api {get} /api/users Prints list of all users in database.
 * @apiGroup Test
 * 
 * 
 * @apiSuccess {JSON} Array of all users and their properties.
 * @apiError {HTML} Raw error.
 */
app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    return err
      ? res.send(err)
      : res.send(users);
}); });


 
