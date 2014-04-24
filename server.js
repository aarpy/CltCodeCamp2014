'use strict';

var express = require('express'),
    http = require('http');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();

// Configuring socket.io connection
console.log('creating http server');
var server = http.createServer(app);

console.log('starting socket.io');
var io = require('socket.io').listen(server);

console.log('configuring express and routes');
require('./lib/config/express')(app);
require('./lib/routes')(app);

//Socket io configuration
require('./lib/config/socketio')(app, io);

//Redis configuration
require('./lib/redisclient')(io);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
