const express = require('express');
const accountRouter = require('./routes/account-router')
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter)

server.get('/', (req, res) => {
    res.send(`<h3>Let's do some SQL</h3>`)
})

module.exports = server;