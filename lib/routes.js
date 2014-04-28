'use strict';

var index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app, redis) {

  var api = require('./controllers/api')(redis);
    
  // Server API Routes
  app.route('/api/resetUserCount')
    .get(api.resetUserCount);
  app.route('/api/resetServerNames')
    .get(api.resetServerNames);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};