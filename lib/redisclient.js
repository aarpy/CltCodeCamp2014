var redis = require("redis"),
    os = require("os"),
    hostname = os.hostname();

// export function for listening to the socket
module.exports = function (config, io) {
  console.log("initializing redisclient");

  var dataClient = redis.createClient(config.redisPort, config.redisHost),
      publishClient = redis.createClient(config.redisPort, config.redisHost);

  dataClient.on("error", function (err) {
    console.log("redisclient:error:data connectoin: " + err);
  });

  publishClient.on("error", function (err) {
    console.log("redisclient:error:publish connectoin: " + err);
  });

  publishClient.on("subscribe", function (channel, count) {
      console.log("redisclient:subscribe: " + channel + ", " + count);
  });

  publishClient.on("unsubscribe", function (channel, count) {
      console.log("redisclient:unsubscribe: " + channel + ", " + count);
  });

  publishClient.on("message", function (channel, message) {
      console.log("redisclient:message:" + channel + ": " + message);
      if (channel === "user:join") {
        dataClient.get("user:count", function(err, usercount) {
          io.sockets.emit("join", {
            username: message,
            usercount: usercount
          });
        });
      } else if (channel === "user:left") {
        dataClient.get("user:count", function(err, usercount) {
          io.sockets.emit("left", {
            username: message,
            usercount: usercount
          });
        });
      } else if (channel === "user:message") {
        var index = message.indexOf(':');
        if (index <= 0 || index === message.length - 1) return;

        io.sockets.emit("message", {
          username: message.substring(0, index),
          content: message.substring(index + 1)
        });
      } else if (channel === "server:join") {
        io.sockets.emit("server:join", {
          servername: message
        });
      } else if (channel === "server:left") {
        io.sockets.emit("server:left", {
          servername: message
        });
      }
  });

  publishClient.subscribe("user:join", "user:left", "user:message", "server:join", "server:left");

  // notify other clients that a new user has joined
  dataClient.sadd("server:names", hostname);
  dataClient.publish('server:join', hostname);

  function shutdown() {
    if (dataClient !== null) dataClient.end();
    if (publishClient !== null) publishClient.end();
  }

  return {
    dataClient: dataClient,
    publishClient: publishClient,
    shutdown: shutdown
  };
};