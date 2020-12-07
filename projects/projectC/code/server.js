var express = require('express')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let firebase = require('firebase');
let userNum = 0;
let allUsers = [];
let astronautids = [];
let usersid = []

// let wreckageCollectedArray = [];


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//connection to the database
let firebaseConfig = {
    apiKey: "AIzaSyAchvhSZ69lsBio90gHXePFgfLfg3MFXJY",
    authDomain: "abc-project-c.firebaseapp.com",
    databaseURL: "https://abc-project-c.firebaseio.com",
    projectId: "abc-project-c",
    storageBucket: "abc-project-c.appspot.com",
    messagingSenderId: "873084013315",
    appId: "1:873084013315:web:9bbc46046ee102e7efb736",
    measurementId: "G-HGKKHMGZVV"
};

//initialize firebase
let firebaseapp = firebase.initializeApp(firebaseConfig);
let database = firebaseapp.database();
let messagelistref = database.ref('messages');


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
        socket.to(`room${roomNumber}`).emit('sendDataToNewUser');

    }
    socket.on("toFirstUser", (data) => {
        socket.to(`room${data.roomNumber}`).emit("secondUserData", data);
    })

    socket.on("anotherUserInfo", (data) => {
        console.log(data.roomNumber)
        socket.to(`room${data.roomNumber}`).emit('User1Info', data);
    })

    socket.on("keyInfo", (data) => {
        socket.to(`room${data.roomNumber}`).emit('anotherUserKeyInfo', data.key);
    })

    socket.on("newWreckageCollected", (data) => {
        let userWreckageArray = data.wreckageCollected;
        let wreckageArray = data.allWreckages;

        // console.log("received wreckage array", userWreckageArray);
        // console.log("wreackges are", wreckageArray);

        let wreckageCollectedArray = []

        for (var i = 0; i < userWreckageArray.length; i++) {
            if (userWreckageArray[i] != null || userWreckageArray[i] != undefined) {
                wreckageCollectedArray[i] = userWreckageArray[i];
                console.log("wreckage array is ", wreckageCollectedArray);
            }
        }

        let sharedWreckages = 0;

        for (let i = 0; i < wreckageArray.length; i++) {
            if (wreckageCollectedArray[i] != undefined) {
                if (wreckageCollectedArray[i].className == wreckageArray[i].className) {
                    sharedWreckages += 1;
                    console.log(sharedWreckages + "shared wreckage has been collected");

                }
            }
        }


        if (sharedWreckages == 6) {
            console.log("all the powers have been collected");
            sharedWreckages = 0;
            io.to(`room${data.roomNumber}`).emit("mergeSpacecraft");
        }

        socket.to(`room${data.roomNumber}`).emit("updateWreckageCollected", data.wreckageCollected);
    })


    socket.on("allWreckagesCollected", (data) => {
        io.to(`room${data.roomNumber}`).emit("mergeSpacecraft");
    })

    socket.on('mergeReady', (astid) => {
        let astronautid = astid.astid;
        astronautids.push(astronautid);
        console.log(astronautids);

        const allEqual = astronautids => astronautids.every(check => check === astronautids[0]);
        const result = allEqual(astronautids);
        console.log("astronautids", result);
        if (result == false) {
            io.to(`room${roomNumber}`).emit("mergeNow")
        }
    })

    socket.on('spacecraftapproached', (userid) => {
        usersid.push(userid);
        const allEqual = usersid => usersid.every(checkid => checkid === usersid[0]);
        const result = allEqual(usersid);
        console.log(result);
        if (result == false) {
            console.log("launch now!");
            io.to(`room${roomNumber}`).emit('launch')
        }
    })

    socket.on('astronautin', () => {
        socket.to(`room${roomNumber}`).emit("astronautRemove", socket.id)
    })

    socket.on("disconnect", () => {
        userNum -= 1
            // console.log("quit" + allUsers)
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
        io.to(`room${thisRoomNumber}`).emit("quit", socket.id);
    })

    //get messages from the messages box
    socket.on('message-from-one', (data) => {
        //save the message and roomnumber to the database
        messagelistref.push(data);
        console.log("message list is", data.messages, "room is", roomNumber);
        // send the message to the specific room
        let info = { messages: data.messages };
        io.to(`room${roomNumber}`).emit('message-to-all', info);
    })


    //get all archived messages from the database and send them to the person just connected
    messagelistref.once('value').then((snapshot) => {
        console.log("database value is ", snapshot.val());
        let messagelist = snapshot.val();
        if (messagelist !== undefined) {
            //sort data
            io.to(`room${roomNumber}`).emit('messages-incoming', messagelist);
            console.log("messages retrieved are", messagelist);
        }
    })

})

http.listen(3000, () => {
    console.log('listening on *:3000');
});