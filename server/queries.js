// * create a queries file to setup the config of your PostgreSQL connection
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://dwdtbklj:m6mk4KfnUr07QBTEwVvmPG-s8FXvUUfM@salt.db.elephantsql.com:5432/dwdtbklj',
});

// * this is where we will store / create endpoints to communicate from server to database
// * the client this time is you as the server, asking for ish from the db

// * user stories: what are you trying to do?
// * display a single item (display the item that was just submitted) --> GET
// * display all current items in db --> GET
// * get an item by its id --> GET
// * create an item --> POST
// * update an item --> PUT
// * delete an item --> DELETE

// * first enpoint will be a GET request inside the pool.query
// * from the pool query, --> raw SQL to touch api db
// * this is to select all items by id


const getItems = (req, res) => {
  console.log('enetering getItems: we in here!');
  // * use client.query since pool is directly defaults from pool.query
  // * inside the param is the postgresql command to select all items from the db
  // * ASC defaults to ascending order DESC is the opposite
  pool.query('SELECT * FROM items ORDER BY id ASC', (err, items) => {
    if (err) {
      // * a stack is a trace list showing roughly how a program got to a certain point in its execution and what its doing right now
      console.log('this is an error in getItems:', err.stack);
    } else {
      console.log('these are items in the db:', items.rows[0]);
    }

    // * if its all cool give em what they want
    res.status(200).json(items.rows);
  });
};

// * get a single item by id
// * * CHECK OUT REQUEST PARAMETERS ** !!! ~
// * grab the custom id parameter by using the url and using the WHERE clause for the display result
// * in the SQL query were looking for id=$1
// * $1 is a numbered placeholder which postgreql uses natively instad of the usual ? were familiar with

const getItemsById = (req, res) => {
  // * parse a string to return as an integer
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM items WHERE id = $1', [id], (err, items) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(items.rows[0]);
    }
    res.status(200).json(items.rows);
  });
};

// * * ~ POST A NEW USER * * ~
// * api will take a get && POST req to the /items endpoint
// * in the POST req, this is *CREATING* a new item
// * in the below func we are extracting the name, price, & location props from the request body and INSERTING those values

// * to parse incoming req bodies in a middleware before your handlers from the req body property
// * this property is based on user controlled input

const createItem = (req, res) => {
  console.log('dis dat body in createItem yum:', req.body);
  const { name, price, location } = req.body;
  console.log('we in dis createItem bish!');
  // * to communicate with postgresql (db) to INSERT/create items into it
  // * the syntax $1 and $2 in postsql refers to the first arg
  // * if an arg is of a composite type then use dot notation $1.name
  // * arguments can only bes used as data values not as identifiers
  pool.query('INSERT INTO items (name, price, location) VALUES ($1, $2, $3) RETURNING *', [name, price, location], (err, items) => {
    console.log('dis dat item in query:', items);
    if (err) {
      console.log('error in createItem:', err.stack);
    }
    res.status(200).json(items.rows);
  });
};

// * the /users:id endpoint will also take two http reqs
// * GET when grabbing for getItemsById, we're adding PUT to modify an existing user
// * PUT reqs are "IDEMPOTENT" aka an operation that can be applied multiple times without changing the result beyond the initial application of
// * same call over and over will produce the same result

const updateItem = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, location } = req.body;

  pool.query('UPDATE items SET name = $1, price = $2, location = $3 WHERE id = $4', [name, price, location, id], (err, items) => {
    if (err) {
      console.log(err.stack);
    }
    res.status(200).json(items.rows);
  });
};

// * To DELETE a clause on /items/:id to remove a specific item by id
// * v similar to our getUserById func

const deleteItem = (req, res) => {
  const id = parseInt(req.params.id);

  client.query('DELETE FROM items WHERE id = $1', [id], (err, res) => {
    if (err) {
      console.log(err.stack);
    }
    res.status(200).send(`Qorl deleted with ID: ${id}`);
  });
};

// * to be able to access these function from the server.js file, we gotta export dis badbiddie!
// * use module.exports yo~ to create an obj of funcs

module.exports = {
  getItems,
  getItemsById,
  createItem,
  updateItem,
  deleteItem,
}
