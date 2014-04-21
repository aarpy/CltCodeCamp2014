var redis = require("redis"),
    redisclient1 = redis.createClient(),
    redisclient2 = redis.createClient();

// export function for listening to the socket
module.exports = function (socket, io) {
    redisclient1.incrby('user:count', 1, function(err, usercount) {
        var username = 'Guest' + usercount;
        console.log('user joined: ' + username);

        // socket configuration
        socket.username = username;

        // send the new user their name and a list of users
        socket.emit('init', {
            username: username,
            usercount: usercount,
            servername: 'test'
        });

        // notify other clients that a new user has joined
        redisclient2.publish('user:join', username);

        // broadcast a user's message to other users
        socket.on('message', function (data) {
            console.log('received content: ' + data.content);
            redisclient2.publish('user:message', data.content);
        });

        // clean up when a user leaves, and broadcast it to other users
        socket.on('disconnect', function () {
            console.log('received disconnect: ' + username);

            redisclient1.decr('user:count');
            redisclient1.end();

            redisclient2.publish('user:left', username);
            redisclient2.end();
        });
    });
};