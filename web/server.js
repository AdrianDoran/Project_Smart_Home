const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const base = `${__dirname}/public`;
app.use(express.static('public'));

app.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

app.get('/', function(req, res) {
    console.log(`Index loading...`);
    res.sendFile(`${base}/index.html`);
})

app.get('*', (req, res) => {
    console.log('Loading 404.');
    res.sendFile(`${base}/404.html`);
});