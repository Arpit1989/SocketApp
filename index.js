// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;
var cors = require('cors');
var request = require('request');
app.use(cors());

server.listen(port, function () {
  console.log('Server listening at port %d', port);
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
            if (typeof data != "string"){
                if (data.youtube == true){
                    console.log(data);
                    query = data.message;
                    console.log(query);
                    url = "https://www.googleapis.com/youtube/v3/search?part=snippet&&order_by=rating&&q=" +query + "&&type=video&key=AIzaSyDRpnBif-8GCtc4E5DOcLXe2aDBVsdY6BQ";
                    console.log(url);

                    request(url, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            body = JSON.parse(body);
                            socket.broadcast.in(socket.room).emit('new message', {
                                username: socket.username,
                                message: data,
                                room: socket.room,
                                youtube:true,
                                videoId: body.items[0]["id"].videoId
                            });
                        }
                    })
                }
            } else {
                socket.broadcast.in(socket.room).emit('new message', {
                    username: socket.username,
                    message: data,
                    room: socket.room,
                    videoId: '',
                    youtube: false
                });
            }
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

