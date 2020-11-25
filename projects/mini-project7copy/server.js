var express = require('express')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let circleInfo = []

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('user connection')
    io.to(socket.id).emit("socketid", socket.id);

    socket.on("circleInfo", (data) => {
        circleInfo.push(data)
        console.log(circleInfo)
        socket.broadcast.emit('newConnection', data); //tell all the other clients that a new user is connected
        io.to(socket.id).emit("circleInfos", circleInfo)

    })

    // io.to(socket.id).emit("circleInfos", circleInfo)

    // socket.on("posNow", (data) => {
    //     socket.broadcast.emit("circlesPosNow", data)
    // })

    socket.on("newPos", (data) => {
        for (let i = 0; i < circleInfo.length; i++) {
            if (data.socketid == circleInfo[i].socketid) {
                circleInfo[i].posx = data.posx;
                circleInfo[i].posy = data.posy;
            }
        }
        io.emit("updatedCircleInfo", circleInfo)
    })

    socket.on("disconnect", () => {
        for (let i = 0; i < circleInfo.length; i++) {
            if (socket.id == circleInfo[i].socketid) {
                circleInfo.splice(i, 1)
            }
        }
        socket.broadcast.emit("quit", socket.id)
    })

    socket.on("meet", (data) => {
        // console.log(data)
        for (let i = 0; i < circleInfo.length; i++) {
            if (circleInfo[i].socketid == data.meetCircle1 || circleInfo[i].socketi == data.meetCircle2) {
                console.log("original", circleInfo)
                circleInfo[i].color = data.newColor;
                console.log("updated", circleInfo)

                io.emit("updatedCircleInfo", circleInfo)
            }
        }

    })

})

http.listen(3001, () => {
    console.log('listening on *:3001');
});