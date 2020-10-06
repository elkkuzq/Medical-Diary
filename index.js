const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./routes');
var winston = require('winston');
var expressWinston = require('express-winston');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongoDB = 'mongodb://127.0.0.1:27017';

mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connection made');
});


app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false, 
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true, 
    colorize: true,
    ignoreRoute: function (req, res) { return false; }
  }));



app.use('/', api);
app.listen({ port: PORT });