let socket = io();
let socketid;
let anotherUser = false;

let astronaut = document.getElementById("astronautContainer")
let astronaut2 = document.getElementById('astronautContainer2')
let container = document.getElementById("container")
let astronautImg = document.getElementById('astronautImg')
let arrowhint = document.getElementById("arrowHint")
let astronautSize;
let backgroundImg = document.getElementById("backgroundImg")
let backgroundImgPos = 0;
let wreckageCollected = [];
let wreckageCollectedByAnotherUser = [];
let wreckageCollectedNum = 0;

let wreckageNum = 0;

let counter = 0;

let allWreckages = [];
let springs = [];
let allWreckageImgs = [];

let spacecraftappear = false;

let launchConfirmBox = document.getElementById("launchConfirm");

let addCollectLimitationHint = false;
let CollectLimitationHint = document.getElementById("CollectLimitationHint")
let astronautLandingPos = Math.random() * (8006 - 2 * window.innerWidth) + window.innerWidth

for (let i = 0; i < 6; i++) {
    allWreckageImgs[i] = document.getElementById(`w${i+1}Container`)
}

let biggestSize = mapRange(window.innerHeight, 736, 400, 150, 100)
let smallestSize = mapRange(window.innerHeight, 736, 400, 50, 30)

//variables for the message box
let cube = document.getElementsByClassName('cube')[0];
let messageinfobox = document.getElementsByClassName('messageinfobox')[0];
let messagebox = document.getElementById('messagebox');
let sendButton = document.getElementById('send');
let infobox = document.getElementsByClassName('infobox')[0];
let messagetitle = document.getElementById('messagetitle');
let historybox = document.getElementById('historybox');

let clicksNumber = 0;
// let messageNum = 0;
// let messagesCount = document.getElementById('messagesCount');
let closeMessageBox = document.getElementById("closeMessageBox");

let spacecraft = document.getElementById("spacecraft");
let sendMergeinfo = false;

let mergeinstruction = document.getElementById('merge');
let mergearea = document.getElementById('mergearea');
let endingVideo = document.getElementById("endingVideo");

let allWreckageCollected = [];
class Astronaut {
    constructor(x, y) {
        //here with calcPosx, I calculate the position of each element on the screen
        //in a screen with 736 window height
        //and then calculate the position of each element with the user's window height
        //Then it would be easier to fit all the users' window size
        this.calcPosx = x;
        this.posx = (window.innerHeight / 736) * x;
        this.calcPosy = y;
        this.posy = (window.innerHeight / 736) * y
        this.velx = 0;
        this.vely = 0;
        this.accx = 0;
        this.accy = 0;
    }

    update() {
        this.velx = this.velx + this.accx;
        this.vely = this.vely + this.accy;
        this.velx = this.velx * 0.95
        this.vely = this.vely * 0.95
        this.calcPosx = this.calcPosx + this.velx;
        this.calcPosy = this.calcPosy + this.vely;
        this.posx = window.innerHeight * this.calcPosx / 736
        this.posy = window.innerHeight * this.calcPosy / 736

        this.accx = 0;
        this.accy = 0;
    }

    applyForce(forcex, forcey) {
        this.accx = this.accx + forcex;
        this.accy = this.accy + forcey;
    }
}

class Wreckage {
    constructor(x, y, className, size) {
        this.size = size;
        this.calcPosx = x;
        this.posx = (window.innerHeight / 736) * x;
        this.calcPosy = y;
        this.posy = (window.innerHeight / 736) * y
        this.velx = 0;
        this.vely = 0;
        this.accx = 0;
        this.accy = 0;
        this.className = className;
    }
    update() {
        this.velx = this.velx + this.accx;
        this.vely = this.vely + this.accy;
        this.velx = this.velx * 0.95
        this.vely = this.vely * 0.95
        this.calcPosx = this.calcPosx + this.velx;
        this.calcPosy = this.calcPosy + this.vely;
        this.posx = window.innerHeight * this.calcPosx / 736
        this.posy = window.innerHeight * this.calcPosy / 736
        this.accx = 0;
        this.accy = 0;
    }
    applyForce(forcex, forcey) {
        this.accx = this.accx + forcex;
        this.accy = this.accy + forcey;
    }

}

class Spring {
    constructor(a, b, len) { //when constrcting a spring, needs two ball and length
        this.ballA = a;
        this.ballB = b;
        this.len = len;
        this.lenMin = len * 0.5;
        this.lenMax = len * 1.5;

        this.k = 0.2;
    }
    update() {
        let distanceX = this.ballA.posx - this.ballB.posx
        let distanceY = this.ballA.posy - this.ballB.posy
        let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
        let stretch = distance - this.len;

        //hooke's law
        let mag = -1 * this.k * stretch;
        let forcex = distanceX / distance;
        forcex = forcex * mag
        let forcey = distanceY / distance;
        forcey = forcey * mag
        this.ballB.applyForce(-forcex, -forcey)
    }
}


//since I used the calcPosx and calcPosy, I can use the fit numbers here
//although the positions seem to be fit numbers, all the elements will be positioned
//on each client's screen relative to their screen size

let a = new Astronaut(astronautLandingPos, 490)
let w1 = new Wreckage(900, 450, 'w1')
let w2 = new Wreckage(2000, 530, 'w2')
let w3 = new Wreckage(3100, 450, 'w3')
let w4 = new Wreckage(4300, 530, 'w4')
let w5 = new Wreckage(5400, 420, 'w5')
let w6 = new Wreckage(6500, 600, 'w6')
allWreckages = [w1, w2, w3, w4, w5, w6]
arrowhint.style.left = `${astronautLandingPos*(window.innerHeight / 736) - 150}px`;
let mergeareaCalcPosx = 3700;
let mergeareaCalcPosy = 500;
let mergeareaCalcheight = 200;
let mergeareaCalcwidth = 450;

mergearea.style.left = `${mergeareaCalcPosx * (window.innerHeight / 736)}px`
mergearea.style.top = `${mergeareaCalcPosy * (window.innerHeight / 736)}px`
mergearea.style.height = `${mergeareaCalcheight * (window.innerHeight / 736)}px`
mergearea.style.width = `${mergeareaCalcwidth * (window.innerHeight / 736)}px`
let cubeCalcPosx = 1500;
let cubeCalcPosy = 500;
cube.style.left = `${cubeCalcPosx * (window.innerHeight / 736)}px`
cube.style.top = `${cubeCalcPosy * (window.innerHeight / 736)}px`

setTimeout(() => {
    arrowhint.style.opacity = 0;
}, 5000);


backgroundImgPos = -astronautLandingPos + window.innerWidth / 2;
if (backgroundImgPos > backgroundImg.width - window.innerWidth) {
    backgroundImgPos = backgroundImg.width - window.innerWidth
}
backgroundImgPos = backgroundImgPos * (window.innerHeight / 736)
container.style.left = `${backgroundImgPos}px`



document.addEventListener("keydown", (data) => {
    if (data.key == "ArrowLeft") {
        astronautImg.src = "/img/astronaut-left.png"
        if (a.calcPosx > 10) {
            a.applyForce(-0.5, 0)
        }
    }
    if (data.key == "ArrowUp") {
        astronautImg.src = "/img/astronaut-back.png"
        if (a.calcPosy > 465) {
            a.applyForce(0, -0.5)
        }
    }
    if (data.key == "ArrowRight") {
        if (a.calcPosx < 8006 - astronautImg.getBoundingClientRect().width) {
            a.applyForce(0.5, 0)
        }
        astronautImg.src = "/img/astronaut-right.png"
    }
    if (data.key == "ArrowDown") {
        astronautImg.src = "/img/astronaut-front.png"
        if (a.calcPosy < 736 - 150) {
            a.applyForce(0, 0.5)
        }
    }
    // console.log("roomnumber is " + roomNumber)
    socket.emit("keyInfo", { key: data.key, roomNumber: roomNumber })

})

setInterval(() => {
    a.update();

    for (let i = 0; i < allWreckages.length; i++) {
        allWreckages[i].update();
        if (wreckageCollected[i] != undefined || wreckageCollectedByAnotherUser[i] != undefined) {
            springs[i].update();
            // console.log(springs)
        }
    }

    //make the stars floating up and down
    counter += 0.15
    for (let i = 0; i < allWreckages.length; i++) {
        allWreckages[i].posy = allWreckages[i].posy + Math.sin(counter)
    }
    astronautSize = mapRange(a.calcPosy, 465, 586, smallestSize, biggestSize)
    astronautImg.style.height = `${astronautSize}px`
    astronaut.style.height = `${astronautSize}px`
    astronaut.style.width = `${astronautImg.getBoundingClientRect().width}px`
    astronaut.style.left = a.posx + "px"
    astronaut.style.top = a.posy + 'px'

    for (let i = 0; i < allWreckageImgs.length; i++) {
        wreckageSize = mapRange(allWreckages[i].calcPosy, 490, 736, 70, 130)
        allWreckageImgs[i].style.width = `${wreckageSize}px`
        allWreckageImgs[i].style.left = allWreckages[i].posx + "px"
        allWreckageImgs[i].style.top = allWreckages[i].posy + "px"
    }


    //move the background image when user approach the edges
    if (astronaut.getBoundingClientRect().left < 200 && a.calcPosx > 200) {
        backgroundImgPos += Math.abs(a.velx * window.innerHeight / 736)
        container.style.left = `${backgroundImgPos}px`
    }
    if (astronaut.getBoundingClientRect().left > window.innerWidth - 200 && a.calcPosx < 8006 - 200) {
        backgroundImgPos -= Math.abs(a.velx * window.innerHeight / 736)
        container.style.left = `${backgroundImgPos}px`
    }

    //stop the users when reach the edge of ground

    if (a.calcPosy < 455) {
        // console.log("stop")
        a.vely = 0.0;
        a.accy = 0;
    }
    if (a.calcPosy > 586) {
        a.vely = 0.0;
        a.accy = 0;
    }
    if (a.calcPosx < 0) {
        a.velx = 0.0;
        a.accx = 0;
    }

    if (a.calcPosx > 8006 - astronautImg.getBoundingClientRect().width) {
        a.velx = 0.0;
        a.accx = 0;
    }

    for (let i = 0; i < allWreckages.length; i++) {
        if (wreckageCollected[i] == undefined && wreckageCollectedByAnotherUser[i] == undefined) {
            if (Math.abs(a.calcPosx - allWreckages[i].calcPosx) < 30 && Math.abs(a.calcPosy - allWreckages[i].calcPosy < 50)) {
                // console.log("close to each other")
                if (wreckageNum < 3) {
                    wreckageCollected[i] = allWreckages[i]
                    springs[i] = new Spring(a, allWreckages[i], 70)
                    socket.emit("newWreckageCollected", { wreckageCollected: wreckageCollected, roomNumber: roomNumber, allWreckages: allWreckages })
                    wreckageNum += 1;
                    allWreckageCollected[i] = allWreckages[i]
                    console.log(wreckageNum)
                } else {
                    if (addCollectLimitationHint == false) {
                        let newCounter = 0;
                        addCollectLimitationHint = true;
                        CollectLimitationHint.style.color = "white"
                        CollectLimitationHint.style.opacity = 1;
                        CollectLimitationHint.style.left = (allWreckages[i].posx - 100) + 'px'
                        CollectLimitationHintTop = CollectLimitationHint.getBoundingClientRect().top
                        setInterval(() => {
                            newCounter += 0.1
                            CollectLimitationHintTop = CollectLimitationHintTop + Math.sin(counter)
                            CollectLimitationHint.style.top = CollectLimitationHintTop + 'px'
                        }, 50);

                        console.log("you can't collect more wreckages.")
                        setTimeout(() => {
                            CollectLimitationHint.style.opacity = 0;
                            addCollectLimitationHint = false
                        }, 5000);
                    }
                    socket.emit("hasCollectedThree", { roomNumber: roomNumber })

                }
            } else {
                // addCollectLimitationHint = false;
            }
        }
    }

    if (anotherUser == true) {
        a2.update();
        astronaut2Size = mapRange(a2.calcPosy, 465, 586, smallestSize, biggestSize)
        user2.style.height = `${astronaut2Size}px`
        astronaut2.style.left = a2.posx + "px"
        astronaut2.style.top = a2.posy + 'px'

        if (a2.calcPosy < 455) {
            a2.vely = 0.0;
            a2.accy = 0;
        }
        if (a2.calcPosy > 586) {
            a2.vely = 0.0;
            a2.accy = 0;
        }
        if (a2.calcPosx < 0) {
            a2.velx = 0.0;
            a2.accx = 0;
        }

        if (a2.calcPosx > 8006) {
            console.log("stop")
            a2.velx = 0.0;
            a2.accx = 0;
        }
    }

    //define the position of the MessageBox
    //view port variables
    let astronautleft = a.posx;
    let leftviewport = astronaut.getBoundingClientRect().left;
    let rightviewport = astronaut.getBoundingClientRect().right;
    let currentviewleft = astronautleft - leftviewport;
    let currentviewright = currentviewleft + window.innerWidth;
    let viewpointcenter = (currentviewleft + currentviewright) / 2;

    messageinfobox.style.left = currentviewleft + "px";

    // console.log(allWreckageCollected)
    let collectedNum = 0;
    for (let i = 0; i < 6; i++) {
        if (allWreckageCollected[i] != undefined) {
            collectedNum += 1;
        }
    }
    if (collectedNum == 6) {
        socket.emit("allWreckagesCollected", { roomNumber: roomNumber })
    }

}, 50);

function mapRange(value, a, b, c, d) { //Simulating the map function in p5.js
    value = (value - a) / (b - a);
    return c + value * (d - c);
}


// interaction for the message box
cube.addEventListener('click', () => {
    // clicksNumber += 1;
    // if (clicksNumber % 2 == 0) {
    //     messageinfobox.style.animationName = "popdown";
    //     setTimeout(() => {
    //         messageinfobox.style.display = "none";
    //         messageinfobox.style.bottom = "-275px";
    //         messagetitle.innerHTML = "Leave a message here!";
    //     }, 1000)
    // } else {
    messageinfobox.style.display = "block";
    messageinfobox.style.animationName = "popup";
    setTimeout(() => {
            messageinfobox.style.bottom = "0";
        }, 1000)
        // }
})

closeMessageBox.addEventListener("click", () => {
    messageinfobox.style.animationName = "popdown";
    setTimeout(() => {
        messageinfobox.style.display = "none";
        messageinfobox.style.bottom = "-275px";
        messagetitle.innerHTML = "Leave a message here!";
    }, 1000)


})


sendButton.addEventListener('click', () => {
    // messageNum += 1;
    // messagesCount.innerHTML = messageNum;
    let messages = messagebox.value;
    let data = { messages: messages, roomNumber: roomNumber };
    console.log("roomnumber in message " + roomNumber)
    socket.emit('message-from-one', data);
    messagebox.value = "";
    messagetitle.innerHTML = "Messages successfully stored!";
})

messagebox.addEventListener('keyup', () => {
    if (event.keyCode === 13) {
        sendButton.click();
    }
})

//got the new messages from the database
socket.on('messages-incoming', (messagelist) => {
    console.log("Got the data", messagelist);

    if (messagelist !== null) {
        let keys = Object.keys(messagelist);
        console.log("The user ID's are", keys);
        for (var i = 0; i < keys.length; i++) {
            let messages = messagelist[keys[i]].messages;
            let dataroomNum = messagelist[keys[i]].roomNumber;
            console.log("database messages", messages, "database room number", dataroomNum);
            if (dataroomNum == roomNumber) {
                console.log("got the room messages");
                appendMessage(messages);
            }
        }
    }

})

socket.on('message-to-all', (info) => {
    appendMessage(info.messages);
    console.log("message received", info.messages);
})

function appendMessage(message) {
    let li = document.createElement("li");
    li.style.margin = "2%";
    let p = document.createElement("p");
    p.innerHTML = message;
    li.appendChild(p);

    // make sure the new messages appear on top of the previous ones:
    // from: https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend
    historybox.prepend(li);
    historybox.scrollTop = 0;
}

//approach
setInterval(() => {
        if (Math.abs(a.calcPosx - cubeCalcPosx) < 50 && Math.abs(a.calcPosy - cubeCalcPosy < 80)) {
            console.log("message box approached!");
            infobox.style.animationName = "openbox";
            infobox.style.left = `${(cubeCalcPosx+ 100)  * (window.innerHeight / 736)}px`
            infobox.style.top = `${cubeCalcPosy * (window.innerHeight / 736)}px`

            setTimeout(() => {
                infobox.style.opacity = "1";
            }, 1000)
        } else {
            infobox.style.animationName = "closebox";
            setTimeout(() => {
                infobox.style.opacity = "0";
            }, 1000)
        }
    }, 50)
    // end for the message box interaction



//--------------------------------------------
//--------------------------------------------
//socket part







socket.on("firstUser", (data) => {
    socketid = data.socketid;
    roomNumber = data.roomNumber;
    thisIndex = data.thisIndex;
    console.log('you are the first user here in room', roomNumber)
})

socket.on("secondUser", (data) => {
    socketid = data.socketid;
    roomNumber = data.roomNumber;
    thisIndex = data.thisIndex;
    console.log("you are the second user here in room", roomNumber)
    info = { roomNumber: data.roomNumber, socketid: socketid, acalcPosx: a.calcPosx, acalcPosy: a.calcPosy, aposx: a.posx, aposy: a.posy, w1podx: w1.posx, w1pody: w1.posy, w2podx: w2.posx, w2pody: w2.posy, w3podx: w3.posx, w3pody: w3.posy, w4podx: w4.posx, w4pody: w4.posy, w5podx: w5.posx, w5pody: w5.posy, w6podx: w6.posx, w6pody: w6.posy, windowWidth: window.innerWidth, windowHeight: window.innerHeight }
    socket.emit("toFirstUser", info)
    console.log(info)
})

socket.on("secondUserData", (data) => {
    a2 = new Astronaut(data.acalcPosx, data.acalcPosy)
    user2 = document.createElement('img');
    user2.src = "/img/astronaut-left.png";
    user2.id = "astronautImg2"
    user2.style.height = "150px"
    console.log(astronaut2.childNodes)

    if (astronaut2.childNodes.length < 1) {
        astronaut2.appendChild(user2)
    }
    astronaut2Size = mapRange(a2.calcPosy, 465, 586, smallestSize, biggestSize)
    user2.style.height = `${astronaut2Size}px`
    astronaut2.style.left = a2.posx + "px"
    astronaut2.style.top = a2.posy + 'px'
    anotherUser = true;

})

socket.on("sendDataToNewUser", (data) => {
    let wreckagePos = [{ posx: w1.calcPosx, posy: w1.calcPosy }, { posx: w2.calcPosx, posy: w2.calcPosy }, { posx: w3.calcPosx, posy: w3.calcPosy }, { posx: w4.calcPosx, posy: w4.calcPosy }, { posx: w5.calcPosx, posy: w5.calcPosy }, { posx: w6.calcPosx, posy: w6.calcPosy }]
        // console.log(wreckagePos)
    info = { roomNumber: roomNumber, socketid: socketid, acalcPosx: a.calcPosx, acalcPosy: a.calcPosy, aposx: a.posx, aposy: a.posy, wreckagePos: wreckagePos, w1posx: w1.calcPosx, w1posy: w1.calcPosy, w2posx: w2.calcPosx, w2posy: w2.calcPosy, w3posx: w3.calcPosx, w3posy: w3.calcPosy, w4posx: w4.calcPosx, w4posy: w4.calcPosy, w5posx: w5.calcPosx, w5posy: w5.calcPosy, w6posx: w6.calcPosx, w6posy: w6.calcPosy, wreckageCollected: wreckageCollected, windowWidth: window.innerWidth, windowHeight: window.innerHeight }
    socket.emit("anotherUserInfo", info)
    console.log(info)
})

socket.on("User1Info", (data) => {
    console.log('another user 1', data)
    a2 = new Astronaut(data.acalcPosx, data.acalcPosy)
    user2 = document.createElement('img');
    user2.src = "/img/astronaut-left.png";
    user2.id = "astronautImg2"
    user2.style.height = "150px"
    console.log(astronaut2.childNodes)

    if (astronaut2.childNodes.length < 1) {
        astronaut2.appendChild(user2)
    }
    astronaut2Size = mapRange(a2.calcPosy, 465, 586, smallestSize, biggestSize)
    user2.style.height = `${astronaut2Size}px`
    astronaut2.style.left = a2.posx + "px"
    astronaut2.style.top = a2.posy + 'px'
    anotherUser = true;
    wreckageCollectedByAnotherUser = data.wreckageCollected
    for (let i = 0; i < allWreckages.length; i++) {
        // console.log(data)
        allWreckages[i].calcPosx = data.wreckagePos[i].posx;
        allWreckages[i].calcPosy = data.wreckagePos[i].posy;
        wreckageSize = mapRange(allWreckages[i].calcPosy, 490, 736, 70, 130)
        allWreckageImgs[i].style.width = `${wreckageSize}px`
        allWreckageImgs[i].style.left = allWreckages[i].posx + "px"
        allWreckageImgs[i].style.top = allWreckages[i].posy + "px"

        if (wreckageCollectedByAnotherUser[i] != undefined) {
            springs[i] = new Spring(a2, allWreckages[i], 70)
            console.log(springs)
        }
    }
})

socket.on("anotherUserKeyInfo", (data) => {
    if (data == "ArrowLeft") {
        document.getElementById("astronautImg2").src = "/img/astronaut-left.png"
        if (a2.calcPosx > 0) {
            a2.applyForce(-0.5, 0)
        }
    }
    if (data == "ArrowUp") {
        document.getElementById("astronautImg2").src = "/img/astronaut-back.png"
        if (a2.calcPosy > 465) {
            a2.applyForce(0, -0.5)
        }
    }
    if (data == "ArrowRight") {
        document.getElementById("astronautImg2").src = "/img/astronaut-right.png"
        if (a2.calcPosx < 8006 - document.getElementById("astronautImg2").getBoundingClientRect().width) {
            a2.applyForce(0.5, 0)
        }
    }
    if (data == "ArrowDown") {
        document.getElementById("astronautImg2").src = "/img/astronaut-front.png"
        if (a2.calcPosy < 736 - 150) {
            a2.applyForce(0, 0.5)
        }
    }
})

socket.on("updateWreckageCollected", (data) => {
    wreckageCollectedByAnotherUser = data
    console.log(wreckageCollectedByAnotherUser)
    for (let i = 0; i < allWreckages.length; i++) {
        if (wreckageCollectedByAnotherUser[i] != undefined && wreckageCollectedByAnotherUser[i].className == allWreckages[i].className) {
            springs[i] = new Spring(a2, allWreckages[i], 70)
            allWreckageCollected[i] = allWreckages[i];
            console.log(springs)
        }
    }
})

socket.on("quit", (data) => {
    astronaut2.removeChild(document.getElementById("astronautImg2"))
    anotherUser = false;
    wreckageCollectedByAnotherUser = []
    console.log("you are now the only user here")
})


socket.on("mergeSpacecraft", () => {
    // console.log("all the powers has been collected");
    mergearea.style.opacity = 1;
    mergeinstruction.style.display = "block";


    setInterval(() => {
        //define variables
        let astronautleft = a.posx;
        let leftviewport = astronaut.getBoundingClientRect().left;
        let rightviewport = astronaut.getBoundingClientRect().right;
        let currentviewleft = astronautleft - leftviewport;
        let currentviewright = currentviewleft + window.innerWidth;

        let viewpointcenter = (currentviewleft + currentviewright) / 2;

        let instructionleft = viewpointcenter - window.innerWidth * 0.35;


        // merge instruction appear
        mergeinstruction.style.left = instructionleft + 'px'
        mergeinstruction.style.animationName = "blinker";

        // let mergeareaLeft = mergearea.offsetLeft;
        // let mergeareaRight = mergeareaLeft + mergearea.getBoundingClientRect().width;
        // let mergeareaTop = mergearea.offsetTop;
        // let mergeareaBottom = mergeareaTop + mergearea.getBoundingClientRect().height;
        let astronaut1InMergeArea = false;
        let astronaut2InMergeArea = false;

        // console.log(mergeareaLeft, mergeareaRight, mergeareaTop, mergeareaBottom);

        if (a.calcPosx > mergeareaCalcPosx && a.calcPosx < mergeareaCalcPosx + mergeareaCalcwidth && a.calcPosy > mergeareaCalcPosy && a.calcPosy < mergeareaCalcPosy + mergeareaCalcheight) {
            // console.log("astronaut1 in the merge area");
            astronaut1InMergeArea = true;
        }


        if (a2.calcPosx > mergeareaCalcPosx && a2.calcPosx < mergeareaCalcPosx + mergeareaCalcwidth && a2.calcPosy > mergeareaCalcPosy && a2.calcPosy < mergeareaCalcPosy + mergeareaCalcheight) {
            // console.log("astronaut2 in the merge area");
            astronaut2InMergeArea = true;
        }


        //merge conditions all met!
        if (astronaut1InMergeArea == true && astronaut2InMergeArea == true) {
            console.log("can merge now!");
            mergeinstruction.style.display = "none";
            mergestart.style.display = "block";
            mergestart.style.left = instructionleft + "px";
            mergearea.style.backgroundColor = "#eee8a1a1";
            mergearea.style.boxShadow = "0 0 20px 0px #dfff2f";

            if (sendMergeinfo == false) {
                let astid = { astid: socket.id }
                socket.emit('mergeReady', astid);
                sendMergeinfo = true;
            }
        }
    }, 50)


    //merge now!
    socket.on('mergeNow', () => {
        console.log("merge now");
        let astronautleft = a.posx;
        let leftviewport = astronaut.getBoundingClientRect().left;
        let rightviewport = astronaut.getBoundingClientRect().right;
        let currentviewleft = astronautleft - leftviewport;
        let currentviewright = currentviewleft + window.innerWidth;
        let viewpointcenter = (currentviewleft + currentviewright) / 2;

        for (var i = 0; i < allWreckageImgs.length; i++) {
            allWreckageImgs[i].style.animationName = "disappear";
        }

        setTimeout(() => {
            for (var i = 0; i < allWreckageImgs.length; i++) {
                allWreckageImgs[i].style.opacity = "0";
            }
        }, 2000)

        setTimeout(() => {
            console.log("powers merged, a big power!");
            let mergedpower = document.createElement('img');
            mergedpower.src = "/img/wreckage1.png";
            mergedpower.style.position = "absolute";
            mergedpower.style.width = "200px";
            mergedpower.style.left = mergearea.offsetLeft + 100 + "px";
            mergedpower.style.top = "100px";
            mergedpower.style.display = "block"
            mergedpower.style.animationName = "appear";
            mergedpower.style.animationDuration = "2s";
            container.appendChild(mergedpower);

            setTimeout(() => {
                mergedpower.style.animationName = "disappear";
                mergedpower.style.animationDuration = "2s";
                setTimeout(() => {
                    mergedpower.style.display = "none";
                    spacecraft.style.display = "block";
                    spacecraft.style.left = mergearea.offsetLeft + "px";
                    spacecraft.style.animationName = "landing";

                    setTimeout(() => {
                        spacecraft.style.display = "block";
                        spacecraft.style.animationName = "float";
                        spacecraft.style.animationDirection = "alternate";
                        spacecraft.style.animationIterationCount = "infinite";


                        setTimeout(() => {
                            spacecraftappear = true;
                        }, 2000)

                    }, 4000)

                }, 2000)
            }, 3000)

        }, 3500)
    })


    let getonspacecraft = false;

    setInterval(() => {

        // if (Math.abs(a.calcPosx - spacecraft.offsetLeft) < 300 && Math.abs(a.calcPosy - spacecraft.offsetTop < 420 || spacecraftappear == true)) {
        if (spacecraftappear == true) {

            console.log("spacecraft approached");
            launchConfirmBox.style.display = "block";
            launchConfirmBox.style.animationName = "blinker";
            launchConfirmBox.style.left = mergearea.offsetLeft + 100 + "px";
            mergestart.innerHTML = "Success! Now let's get back to earth!";

            if (getonspacecraft == false) {
                document.body.addEventListener('keyup', (event) => {
                    if (event.keyCode === 13) {
                        let userid = socket.id;
                        astronaut.removeChild(document.getElementById("astronautImg"));
                        socket.emit('spacecraftapproached', userid);
                        socket.emit('astronautin');
                        launchConfirmBox.style.display = "none";
                    }
                })
                getonspacecraft = true;
            }


        }
    }, 1000)

    socket.on('launch', () => {
        //make sure the instruction doesn't appear again
        setInterval(() => {
            mergeinstruction.style.display = "none";
        })

        // let astronautleft = a.posx;
        // let leftviewport = astronaut.getBoundingClientRect().left;
        // let currentviewleft = astronautleft - leftviewport;
        console.log("video ready!");
        endingVideo.style.display = "block";
        // endingVideo.style.left = currentviewleft + "px";
        endingVideo.play();
    })

    socket.on('astronautRemove', () => {
        astronaut2.removeChild(document.getElementById("astronautImg2"));
        console.log("another astronaut has got on the spacecraft");
    })
})