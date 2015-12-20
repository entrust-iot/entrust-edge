'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express()

console.log('Entrust Edge REST Api starting...');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/test', function(req, res) {
  console.log('test request fired');
  res.send('hello world');
});

var server = app.listen(8080);
