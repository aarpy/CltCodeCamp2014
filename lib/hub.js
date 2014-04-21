// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
    var nextUserId = 0;
    var totalUsers = 0;

    // find the lowest unused "guest" name and claim it
    var getGuestName = function () {
        nextUserId ++;
        totalUsers ++;
        return 'Guest' + nextUserId;
    };

    var release = function() {
        totalUsers--;
    }

    // serialize claimed names as an array
    var getCount = function () {
        return totalUsers;
    };

    return {
        getCount: getCount,
        getGuestName: getGuestName,
        release: release
    };
}());

// export function for listening to the socket
module.exports = function (socket, io) {
    var username = userNames.getGuestName();
    console.log('user joined: ' + username);

    socket.username = username;

    // send the new user their name and a list of users
    socket.emit('init', {
        username: username,
        usercount: userNames.getCount(),
        servername: "test"
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('join', {
        username: username,
        usercount: userNames.getCount()
    });

    // broadcast a user's message to other users
    socket.on('message', function (data) {
        console.log('received content: ' + data.content);
        console.log('user count: ' + userNames.getCount());
        socket.broadcast.emit('message', {
            username: username,
            content: data.content,
            usercount: userNames.getCount()
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        console.log('received disconnect: ' + username);
        userNames.release();
        socket.broadcast.emit('left', {
            username: username,
            usercount: userNames.getCount()
        });
    });
};