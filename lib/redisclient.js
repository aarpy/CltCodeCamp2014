var redis = require("redis"),
    redisclient1 = redis.createClient();

// export function for listening to the socket
module.exports = function (io) {

  redisclient1.on("error", function (err) {
    console.log("Redis connectoin error: " + err);
  });

  redisclient1.on("subscribe", function (channel, count) {
      console.log("Redis client subscribed to " + channel + ", " + count + " total subscriptions");
  });

  redisclient1.on("unsubscribe", function (channel, count) {
      console.log("Redis client unsubscribed from " + channel + ", " + count + " total subscriptions");
  });

  redisclient1.on("message", function (channel, message) {
      console.log("Redis client channel " + channel + ": " + message);
      if (channel == "user:join") {
        io.sockets.emit("join", {
          username: "todo1",
          usercount: redisclient1.get("user:count")
        });
      } else if (channel == "user:left") {
        io.sockets.emit("left", {
          username: "todo2",
          usercount: redisclient1.get("user:count")
        });
      } else if (channel == "user:message") {
        io.sockets.emit("message", {
          username: "todo3",
          content: message
        });
      }
  });

  redisclient1.subscribe("user:join", "user:left", "user:message");
};