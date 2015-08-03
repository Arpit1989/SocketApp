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

var Redis = require('ioredis');
var redis = new Redis();


// Routing
app.use(express.static(__dirname + '/public'));
app.get('/:id',function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});



// usernames which are currently connected to the chat
    var usernames = {};
    var rooms = {};

    io.on('connection', function (socket) {

        socket.on('setRoom', function (roomName) {

            // we store the username in the socket session for this client
            socket.room = roomName;
            if (rooms[socket.room] === undefined){
                rooms[socket.room] = { name:socket.room, users:[] };
            }
            // add the client's username to the global list
            socket.join(socket.room);

        });

        var addedUser = false;
        // when the client emits 'new message', this listens and executes
        socket.on('feed data',function(data){

            redis.set(Object.keys(data)[0].toLowerCase(), data[Object.keys(data)[0]].toLowerCase());
            redis.get(Object.keys(data)[0].toLowerCase(), function (err, result) {
                console.log(result);
            });

            socket.broadcast.in(socket.room).emit('new message', {
                username: socket.username,
                data: Object.keys(data)[0] + "added "
            });
        });

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
                }else if (data.username == "Jasmine") {
                    console.log(data);
                    socket.broadcast.in(socket.room).emit('new message', {
                        username: data.username,
                        message: data.message,
                        room: socket.room,
                        videoId: '',
                        youtube: false
                    });
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
            //if room is undefined in the global room list then only create a new object.


            if (rooms[socket.room].users === undefined){
                rooms[socket.room] = { name:socket.room, users:[] };
            }
            rooms[socket.room].users.push(username);

            addedUser = true;
            socket.emit('login', {
                numUsers: rooms[socket.room].users.length,
                room: socket.room
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.in(socket.room).emit('user joined', {
                username: socket.username,
                numUsers: rooms[socket.room].users.length,
                room: socket.room
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function () {
            socket.broadcast.to(socket.room).emit('typing', {
                username: socket.username
            });
        });

        socket.on("play_music",function(data){
            socket.broadcast.to(socket.room).emit('play_music',{data: data});
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
                var users = rooms[socket.room].users;
                var index = users.indexOf(socket.username)
                if (index > -1) {
                    users.splice(index, 1);
                }
                rooms[socket.room].users = users;
                // echo globally that this client has left
                socket.broadcast.to(socket.room).emit('user left', {
                    username: socket.username,
                    numUsers: rooms[socket.room].users.length,
                    room: socket.room
                });
            }
            socket.leave(socket.room);
        });
    });

