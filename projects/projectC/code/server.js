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
    let roomNumber;

    for (let i = 0; i < allUsers.length; i++) {
        console.log("aaaaaaaa" + allUsers[i])
        if (allUsers[i] == socket.id) {
            thisPushed = true;
            thisIndex = i;
        }
        if ((allUsers[i] == "" || allUsers[i] == undefined) && thisPushed == false) {
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
        console.log("quit" + allUsers)
        console.log('quit' + roomNumber)
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i] == socket.id) {
                console.log("socket.id" + socket.id)
                thisRoomNumber = Math.floor(thisIndex / 2);
                allUsers[i] = ""
                if ((i + 1) % 2 == 1) { //this means the quited user is the first user in that room
                    allUsers[i] = allUsers[i + 1]
                    allUsers[i + 1] = ""
                }
            }
        }
        console.log("quit2" + allUsers)

        io.to(`room${thisRoomNumber}`).emit("quit", socket.id);

        // socket.to(`room${roomNumber}`).emit("quit", socket.id);
        // socket.broadcast.emit("quit", socket.id)
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});