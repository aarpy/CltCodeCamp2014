'use strict';

var os = require("os"),
    hostname = os.hostname();

/**
 * Get awesome things
 */
module.exports = function(redis, io) {
  return {
    resetUserCount: function(req, res) {
      redis.dataClient.set('user:count', 0);
      res.json({ message: "User count reset successfully" });
    },
    resetServerNames: function(req, res) {
      redis.dataClient.del('server:names', function(err) {
        redis.dataClient.sadd('server:names', hostname);
      });
      res.json({ message: "Server names reset successfully" });
    },
    notifyShutdown: function(req, res) {
        io.sockets.emit("server:left", {
          servername: hostname
        });
      res.json({ message: "Notification sent successfully" });
    }
  };
};