const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');

require('dotenv').config()

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}, () => console.log('db connected'));

const db = mongoose.connection;

db.on('error', () => console.log('db unsuccessfull'));

app.use('/', require('./routes/router'))

app.listen(3002, () => console.log('server running 3002'))