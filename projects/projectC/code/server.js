var express = require('express')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let userNum = 0;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    userNum += 1;
    console.log(userNum, 'new connection', socket.id)

    if (userNum == 1) {
        io.to(socket.id).emit("firstUser", socket.id);
    }
    // io.to(socket.id).emit("socketid", socket.id);

    if (userNum == 2) {
        console.log('there is another user on this page')
        io.to(socket.id).emit("secondUser", socket.id);

        //send info to the first user
        socket.broadcast.emit("sendDataToNewUser")
    }

    socket.on("toFirstUser", (data) => {
        socket.broadcast.emit("secondUserData", data)
    })

    socket.on("anotherUserInfo", (data) => {
        socket.broadcast.emit('newConnection', data);
    })

    socket.on("keyInfo", (data) => {
        socket.broadcast.emit("anotherUserKeyInfo", data)
    })

    socket.on("newWreckageCollected", (data) => {
        socket.broadcast.emit("updateWreckageCollected", data)
    })
    socket.on("disconnect", () => {
        userNum -= 1
        socket.broadcast.emit("quit", socket.id)
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});