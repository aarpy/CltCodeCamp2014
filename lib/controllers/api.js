'use strict';

/**
 * Get awesome things
 */
module.exports = function(redis) {
  return {
    resetUserCount: function(req, res) {
      redis.dataClient.set('user:count', 0);
      res.json({ message: "user count reset successfully" });
    }
  };
};