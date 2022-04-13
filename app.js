const express = require('express');
const app = express();
const db = require('./db_connection');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mana = require('./fonction_mana');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/', async(req, res) => {
    let mana_month = req.body.month;
    let mana_day = req.body.day;
    const data = await mana(mana_month, mana_day)
    res.status(200).json({ data })
})

module.exports = app;