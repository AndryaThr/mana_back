const express = require('express');
const final = require('./localhost.json');
const app = express();
const db = require('./db_connection');
const namebook= require('./mapBoky.json');

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

console.log(db)
app.post('/add', function (req, res) {
  var IdValue = req.body.id
  var FirstNameValue = req.body.firstname
  var LastNameValue = req.body.lastname}

db.close();
app.get('/', (req, res) => {
  res.json(
    {'res': "ok",}
  )
}) 

module.exports = app;