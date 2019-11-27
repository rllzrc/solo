// * create a file to use as an entry point for the server
// * require express module and the built in bodyParser middleware

const express = require('express');
// * setup the app and port variables
const app = express();
const port = 3000;

const path = require('path');

// * returns middleware that only parses json and only looks at reqs whre content-type header matches the type option 
// * a new body obj containing the parsed data is populated on the obj after the middleware in the req.body 
const bodyParser = require('body-parser');

// ****** THIS IS FOR THE QUERIES.JS FILE ******
// * to get all the exported funcs from the queries.js file
// * require it in and assign it to a variable

const db = require('./queries.js')

// *** for each endpoint set the http req method, endpoint URL path and relevant func

app.use(express.json());

app.get('/items', db.getItems);
app.get('/items/:id', db.getItemsById);
app.post('/items', db.createItem);
app.put('/items/:id', db.updateItem);
app.delete('/items/:id', db.deleteItem);

// // * create a queries file to setup the config of your PostgreSQL connection
// const {Pool} = require('pg');
// const pool = new Pool({
//   connectionString: 'postgres://dwdtbklj:m6mk4K...@salt.db.elephantsql.com:5432/dwdtbklj',
// });


// * setup global middleware call to config the body-parser library to parse the body (req.body) at json
// * this way people can actually read the data from this bigass object

app.use(bodyParser.json());

// * these are static files where css/html/images live
// * the client folder will point to the front end aka src
app.use(express.static('src'));

// * tell a route to catch a get request on the ROOT '/' url
// * this is the general landing page of your site
// * when a get root endpoint is received, respond with the index.html file

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, '../index.html'));
});

// // * hard coded to test just to make sure it is listening properly
// app.get('/', (req, res) => {
//   res.json({ info: 'Node.js, Express, and Postgres API' });
// });

// --- to test in postman --- 
// app.get('/test', (req, res) => {
//   console.log(res.body);
//   res.send(req.body);
// });


// * to setup the app to listen to the port we've set
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
