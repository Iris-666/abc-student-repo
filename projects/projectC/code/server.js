var express = require('express')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let userNum = 0;
let allUsers = [];


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    userNum += 1;
    console.log(userNum, 'new connection', socket.id)
    let thisPushed = false;
    let thisIndex;

    for (let i = 0; i < allUsers.length; i++) {
        // console.log("aaaaaaaa" + allUsers[i])
        if (allUsers[i] == socket.id) {
            thisPushed = true;
            thisIndex = i;
        }
        if (allUsers[i] == "" && thisPushed == false) {
            allUsers[i] = socket.id
            thisPushed = true;
            thisIndex = i;
        }
    }
    if (thisPushed == false) {
        allUsers.push(socket.id)
        thisIndex = allUsers.length - 1;
    }
    console.log("allusers " + allUsers)
    console.log("thisIndex " + thisIndex)

    roomNumber = Math.floor(thisIndex / 2);
    console.log("roomnumber " + roomNumber)
    socket.join(`room${roomNumber}`);

    message = { socketid: socket.id, roomNumber: roomNumber, thisIndex: thisIndex }

    if ((thisIndex + 1) % 2 == 1) {
        io.to(socket.id).emit("firstUser", message);
    }

    if ((thisIndex + 1) % 2 == 0) {
        io.to(socket.id).emit("secondUser", message);

        //send info to the first user
        // socket.broadcast.emit("sendDataToNewUser")
        socket.to(`room${roomNumber}`).emit('sendDataToNewUser');

    }





    // if (userNum == 1) {
    //     io.to(socket.id).emit("firstUser", socket.id);
    // }

    // if (userNum == 2) {
    //     console.log('there is another user on this page')
    //     io.to(socket.id).emit("secondUser", socket.id);
    //     socket.broadcast.emit("sendDataToNewUser")
    // }

    socket.on("toFirstUser", (data) => {
        socket.to(`room${data.roomNumber}`).emit("secondUserData", data);
        // socket.broadcast.emit("secondUserData", data)
    })

    socket.on("anotherUserInfo", (data) => {
        console.log(data.roomNumber)
        socket.to(`room${data.roomNumber}`).emit('User1Info', data);
    })

    socket.on("keyInfo", (data) => {
        socket.to(`room${data.roomNumber}`).emit('anotherUserKeyInfo', data.key);
        // socket.broadcast.emit("anotherUserKeyInfo", data)
    })

    socket.on("newWreckageCollected", (data) => {
        socket.to(`room${data.roomNumber}`).emit("updateWreckageCollected", data.wreckageCollected);
    })
    socket.on("disconnect", () => {
        userNum -= 1
        socket.to(`room${data.roomNumber}`).emit("quit", socket.id);
        // socket.broadcast.emit("quit", socket.id)
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i] == socket.id) {
                allUsers[i] = ""
            }
        }
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});