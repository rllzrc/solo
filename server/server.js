// * create a file to use as an entry point for the server
// * require express module and the built in bodyParser middleware

const express = require('express');
const bodyParser = require('body-parser');

// * create a queries file to setup the config of your PostgreSQL connection
const {Pool} = require('pg')
;
const pool = new Pool({
  connectionString: 'postgres://dwdtbklj:m6mk4K...@salt.db.elephantsql.com:5432/dwdtbklj',
});

// * setup the app and port variables
const app = express();
const port = 3000;

// * setup global middleware call to config the body-parser library to parse the body (req.body) at json
// * this way people can actually read the data from this bigass object

app.use(bodyParser.json());

app.get('/test', (req, res) => {
  console.log(res.body);
  res.send(req.body);
});

// * these are static files where css/html/images live
// * the client folder will point to the front end aka src
app.use(express.static('src'));

// * tell a route to catch a get request on the ROOT '/' url
// * this is the general landing page of your site

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

// * to setup the app to listen to the port we've set
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
