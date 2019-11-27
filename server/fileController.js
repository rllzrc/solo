const express = require('express');

const app = express();
const db = require('./queries.js');

app.get('/items', db.getItems);
app.get('/items/:id', db.getItemsById);
app.post('/items', db.createItem);
app.put('/items/:id', db.updateItem);
app.delete('/items/:id', db.deleteItem);

const fileController = {};

fileController.getItems = (req, res, next) => {
  db.query('SELECT * FROM items ORDER BY id ASC', (err, items) => {
    if (err) {
      console.log(err.stack);
    }
    res.status(200).json(items.rows);
    //return next();
  });
};

module.exports = fileController;
