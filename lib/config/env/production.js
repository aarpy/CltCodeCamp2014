'use strict';

module.exports = {
  env: 'production',
  ip:   process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        '0.0.0.0',
  port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,
  redisHost: process.env.REDIS_HOST_OVERRIDE || process.env.REDIS_HOST || '172.31.26.231',
  redisPort: process.env.REDIS_PORT || 6379,
  redisPassword: process.env.REDIS_PASSWORD || 'cltcodecamp2014'
};