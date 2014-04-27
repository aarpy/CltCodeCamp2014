'use strict';

module.exports = {
  env: 'test',
  redisHost: process.env.REDIS_HOST_OVERRIDE || process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
  redisPassword: process.env.REDIS_PASSWORD || 'cltcodecamp2014'
};