// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.get('/:id',function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});

// usernames which are currently connected to the chat
    var usernames = {};
    var numUsers = 0;
    var room = {};
    io.on('connection', function (socket) {

        socket.on('setRoom', function (roomName) {

            // we store the username in the socket session for this client
            socket.room = roomName;

            // add the client's username to the global list
            socket.join(socket.room);

        });

        var addedUser = false;
        // when the client emits 'new message', this listens and executes
        socket.on('new message', function (data,room) {
            // we tell the client to execute 'new message'
            socket.broadcast.in(socket.room).emit('new message', {
                username: socket.username,
                message: data,
                room: socket.room
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', function (username) {

            // we store the username in the socket session for this client
            socket.username = username;
            // add the client's username to the global list
            usernames[username] = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers,
                room: socket.room
            });
            // echo globally (all clients) that a person has connected
            socket.emit('user joined', {
                username: socket.username,
                numUsers: numUsers,
                room: socket.room
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function () {
            socket.broadcast.to(socket.room).emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', function () {
            socket.broadcast.to(socket.room).emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            // remove the username from global usernames list
            if (addedUser) {
                delete usernames[socket.username];
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.to(socket.room).emit('user left', {
                    username: socket.username,
                    numUsers: numUsers,
                    room: socket.room
                });
            }
            socket.leave(socket.room);
        });
    });

