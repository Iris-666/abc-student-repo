var express = require('express')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let circles = [];

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//general event listener for any socket connection
io.on('connection', (socket) => {
    //code inside here is per connection
    //for each connection we console log this
    io.to(socket.id).emit("socketid", socket.id);
    circles.push(socket.id)
    io.emit('circles', circles)
    socket.on('disconnect', () => {
        // console.log("disconnect", socket.id);
        io.emit('quit', socket.id);
        let index = circles.indexOf(socket.id);
        if (index > -1) {
            circles.splice(index, 1);
        }
        io.emit('circles', circles)

    });

    socket.on('message', (data) => {
        // console.log(data)
        socket.broadcast.emit('broadcast', data);
        // io.emit("incoming", data)
    })

    socket.on('meet', (data) => {
        console.log(data)
        socket.broadcast.emit('meet', data);
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});