const express = require('express')
const app = express()
const port = process.env.PORT || 8080; // Dedicated Port
const base = `${__dirname}/public`;
app.use(express.static('public'));

// CORS Header
app.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Listen for port being used, Port is 8080 if cannot connect
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

// Get Index file of Web Applcation
app.get('/', function(req, res) {
    console.log(`Index loading...`);
    res.sendFile(`${base}/index.html`);
})

app.get('/login', function(req, res) {
    console.log(`Login page loading...`);
    res.sendFile(`${base}/login.html`);
})

app.get('*', (req, res) => {
    console.log('Loading 404.');
    res.sendFile(`${base}/404.html`);
});