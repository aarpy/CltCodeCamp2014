'use strict';

module.exports = function(app, io, redis) {
  var env = app.get('env');

  if ('production' === env) {
    io.set('log level', 1);
  }

  io.sockets.on('connection', function(socket) {
    console.log('socket io started ---');
    require('../hub')(socket, io, redis);
  });
};