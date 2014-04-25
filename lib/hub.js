// export function for listening to the socket
module.exports = function (socket, io, redis) {
  console.log("initializing hub");

    function initialize(err, usercount) {
        var username = 'Guest' + usercount;
        console.log('user:join: ' + username);

        // socket configuration
        socket.username = username;

        // send the new user their name and a list of users
        socket.emit('init', {
            username: username,
            usercount: usercount,
            servername: 'test'
        });

        // notify other clients that a new user has joined
        redis.dataClient.publish('user:join', username);

        // broadcast a user's message to other users
        socket.on('message', function (data) {
            console.log('user:message:' + username + ':' + data.content);
            redis.dataClient.publish('user:message', username + ':' + data.content);
        });

        // clean up when a user leaves, and broadcast it to other users
        socket.on('disconnect', function () {
            console.log('user:left: ' + username);

            redis.dataClient.decr('user:count');
            redis.dataClient.publish('user:left', username);
        });
    }

    redis.dataClient.incrby('user:count', 1, initialize);
};