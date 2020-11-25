var express = require('express')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let circles = [];
let circleInfos = []

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    //send the socket id to the newly connected client
    io.to(socket.id).emit("socketid", socket.id);
    io.emit("someoneConnect", "someoneConnect")
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

        //remove the circle info when the client disconnect
        for (let i = 0; i < circleInfos.length; i++) {
            if (circleInfos[i].id == socket.id) {
                circleInfos.splice(i, 1)
            }
        }

    });

    socket.on("circleInfo", (data) => {
        circleInfos.push(data)
        io.emit("allCircleInfo", circleInfos)
    })

    socket.on('updatedLocation', (data) => {
        socket.broadcast.emit('updatedLocationToClients', data);
    })

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