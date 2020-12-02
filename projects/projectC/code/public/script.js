let socket = io();
let socketid;
let anotherUser = false;

let astronaut = document.getElementById("astronautContainer")
let astronaut2 = document.getElementById('astronautContainer2')
let container = document.getElementById("container")
let astronautImg = document.getElementById('astronautImg')
let astronautSize;
let backgroundImg = document.getElementById("backgroundImg")
let backgroundImgPos = 0;
let wreckageCollected = [];
let wreckageCollectedByAnotherUser = [];
let wreckageCollectedNum = 0;

let wreckageNum = 6;

let counter = 0

let allWreckages = [];
let springs = [];
let allWreckageImgs = [];
for (let i = 0; i < wreckageNum; i++) {
    allWreckageImgs[i] = document.getElementById(`w${i+1}Container`)
}


class Astronaut {
    constructor(x, y) {
        this.posx = x;
        this.posy = y;
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
        this.posx = this.posx + this.velx;
        this.posy = this.posy + this.vely;
        this.accx = 0;
        this.accy = 0;
    }

    applyForce(forcex, forcey) {
        this.accx = this.accx + forcex;
        this.accy = this.accy + forcey;
    }
}

class Wreckage {
    constructor(x, y, className, containerName, size, color) {
        this.size = size;
        this.posx = x;
        this.posy = y;
        this.velx = 0;
        this.vely = 0;
        this.accx = 0;
        this.accy = 0;
        this.color = color;
        this.className = className;
        this.containerName = containerName;
    }
    update() {
        this.velx = this.velx + this.accx;
        this.vely = this.vely + this.accy;
        this.velx = this.velx * 0.95
        this.vely = this.vely * 0.95
        this.posx = this.posx + this.velx;
        this.posy = this.posy + this.vely;
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

let a = new Astronaut(window.innerWidth / 1.2, window.innerHeight / 1.7)
let w1 = new Wreckage(1000, 400, 'w1')
let w2 = new Wreckage(1800, 500, 'w2')
let w3 = new Wreckage(3900, 400, 'w3')
let w4 = new Wreckage(4800, 500, 'w4')
let w5 = new Wreckage(5200, 400, 'w5')
let w6 = new Wreckage(2500, 600, 'w6')

allWreckages = [w1, w2, w3, w4, w5, w6]

document.addEventListener("keydown", (data) => {
    if (data.key == "ArrowLeft") {
        astronautImg.src = "img/astronaut-left.png"
        if (a.posx > 0) {
            a.applyForce(-0.5, 0)
        }
    }
    if (data.key == "ArrowUp") {
        astronautImg.src = "img/astronaut-back.png"
        if (a.posy > window.innerHeight / 1.82) {
            a.applyForce(0, -0.6)
        }
    }
    if (data.key == "ArrowRight") {
        if (a.posx < backgroundImg.width) {
            a.applyForce(0.5, 0)
        }
        astronautImg.src = "img/astronaut-right.png"
    }
    if (data.key == "ArrowDown") {
        astronautImg.src = "img/astronaut-front.png"
        if (a.posy < window.innerHeight - 150) {
            a.applyForce(0, 0.6)
        }
    }
    socket.emit("keyInfo", data.key)

})

setInterval(() => {
    a.update();

    for (let i = 0; i < allWreckages.length; i++) {
        allWreckages[i].update();
        if (wreckageCollected[i] != undefined || wreckageCollectedByAnotherUser[i] != undefined) {
            // console.log("running spring", i);
            // console.log("wreckageCollected[i]", wreckageCollected[i]);
            // console.log("springs[i]", springs[i]);
            // console.log("----")

            springs[i].update();
            console.log(springs)

        }
    }

    counter += 0.15
    for (let i = 0; i < allWreckages.length; i++) {
        allWreckages[i].posy = allWreckages[i].posy + Math.sin(counter)
    }
    astronautSize = mapRange(a.posy, window.innerHeight / 4, window.innerHeight, 20, 200)
    astronautImg.style.height = `${astronautSize}px`
    astronaut.style.left = a.posx + "px"
    astronaut.style.top = a.posy + 'px'

    for (let i = 0; i < allWreckageImgs.length; i++) {
        allWreckageImgs[i].style.left = allWreckages[i].posx + "px"
        allWreckageImgs[i].style.top = allWreckages[i].posy + "px"
    }


    if (astronaut.getBoundingClientRect().left < 200 && a.posx > 210) {
        backgroundImgPos += Math.abs(a.velx)
        container.style.left = `${backgroundImgPos}px`
    }
    if (astronaut.getBoundingClientRect().left > window.innerWidth - 200) {
        backgroundImgPos -= Math.abs(a.velx)
        container.style.left = `${backgroundImgPos}px`

    }

    if (a.posy < window.innerHeight / 1.89) {
        a.vely = 0.0;
        a.accy = 0;
    }
    if (a.posy > window.innerHeight - 140) {
        a.vely = 0.0;
        a.accy = 0;
    }
    if (a.posx < 0) {
        a.velx = 0.0;
        a.accx = 0;
    }

    for (let i = 0; i < allWreckages.length; i++) {
        if (wreckageCollected[i] == undefined && wreckageCollectedByAnotherUser[i] == undefined) {
            if (Math.abs(a.posx - allWreckages[i].posx) < 30 && Math.abs(a.posy - allWreckages[i].posy < 50)) {
                // console.log("close to each other")
                if (wreckageNum < 4) {
                    wreckageCollected[i] = allWreckages[i]
                    springs[i] = new Spring(a, allWreckages[i], 70)
                    socket.emit("newWreckageCollected", wreckageCollected)
                    wreckageNum += 1;
                } else {
                    let hint = document.createElement('p')
                    hint.innerHTML = "You can't collect more wreckages."
                    console.log("you can't collect more wreckages.")
                }
            }
        }
    }

    if (anotherUser == true) {
        a2.update();
        astronaut2Size = mapRange(a2.posy, window.innerHeight / 4, window.innerHeight, 20, 200)
        user2.style.height = `${astronaut2Size}px`
        astronaut2.style.left = a2.posx + "px"
        astronaut2.style.top = a2.posy + 'px'

        if (a2.posy < window.innerHeight / 1.89) {
            a2.vely = 0.0;
            a2.accy = 0;
        }
        if (a2.posy > window.innerHeight - 140) {
            a2.vely = 0.0;
            a2.accy = 0;
        }
        if (a2.posx < 0) {
            a2.velx = 0.0;
            a2.accx = 0;
        }

    }

}, 50);

function mapRange(value, a, b, c, d) { //Simulating the map function in p5.js
    value = (value - a) / (b - a);
    return c + value * (d - c);
}






//--------------------------------------------
//--------------------------------------------
//socket part







socket.on("firstUser", (data) => {
    socketid = data;
    console.log('you are the first user here')
})

socket.on("secondUser", (data) => {
    socketid = data;
    console.log("you are the second user here")
    info = { socketid: socketid, aposx: a.posx, aposy: a.posy, w1podx: w1.posx, w1pody: w1.posy, w2podx: w2.posx, w2pody: w2.posy, w3podx: w3.posx, w3pody: w3.posy, w4podx: w4.posx, w4pody: w4.posy, w5podx: w5.posx, w5pody: w5.posy, w6podx: w6.posx, w6pody: w6.posy }
    socket.emit("toFirstUser", info)
    console.log(info)

})

socket.on("secondUserData", (data) => {
    a2 = new Astronaut(data.aposx, data.aposy)
    user2 = document.createElement('img');
    user2.src = "img/astronaut-left.png";
    user2.id = "astronautImg2"
    user2.style.height = "150px"
    console.log(astronaut2.childNodes)

    if (astronaut2.childNodes.length < 2) {
        astronaut2.appendChild(user2)
    }
    astronaut2Size = mapRange(data.aposy, window.innerHeight / 4, window.innerHeight, 20, 200)
    user2.style.height = `${astronaut2Size}px`
    astronaut2.style.left = a2.aposx + "px"
    astronaut2.style.top = a2.aposy + 'px'
    anotherUser = true;

})

socket.on("sendDataToNewUser", (data) => {
    info = { socketid: socketid, aposx: a.posx, aposy: a.posy, w1podx: w1.posx, w1pody: w1.posy, w2podx: w2.posx, w2pody: w2.posy, w3podx: w3.posx, w3pody: w3.posy, w4podx: w4.posx, w4pody: w4.posy, w5podx: w5.posx, w5pody: w5.posy, w6podx: w6.posx, w6pody: w6.posy, wreckageCollected: wreckageCollected }
    socket.emit("anotherUserInfo", info)
    console.log(info)
})

socket.on("newConnection", (data) => {
    console.log('another user', data)
    a2 = new Astronaut(data.aposx, data.aposy)
    user2 = document.createElement('img');
    user2.src = "img/astronaut-left.png";
    user2.id = "astronautImg2"
    user2.style.height = "150px"
    console.log(astronaut2.childNodes)

    if (astronaut2.childNodes.length < 2) {
        astronaut2.appendChild(user2)
    }
    astronaut2Size = mapRange(data.aposy, window.innerHeight / 4, window.innerHeight, 20, 200)
    user2.style.height = `${astronaut2Size}px`
    astronaut2.style.left = a2.aposx + "px"
    astronaut2.style.top = a2.aposy + 'px'
    anotherUser = true;
    wreckageCollectedByAnotherUser = data.wreckageCollected
    for (let i = 0; i < allWreckages.length; i++) {
        if (wreckageCollectedByAnotherUser[i] != undefined) {
            springs[i] = new Spring(a2, allWreckages[i], 70)
            console.log(springs)
        }
    }

})

socket.on("anotherUserKeyInfo", (data) => {
    if (data == "ArrowLeft") {
        document.getElementById("astronautImg2").src = "img/astronaut-left.png"
        if (a2.posx > 0) {
            a2.applyForce(-0.5, 0)
        }
    }
    if (data == "ArrowUp") {
        document.getElementById("astronautImg2").src = "img/astronaut-back.png"
        if (a2.posy > window.innerHeight / 1.82) {
            a2.applyForce(0, -0.6)
        }
    }
    if (data == "ArrowRight") {
        document.getElementById("astronautImg2").src = "img/astronaut-right.png"
        if (a2.posx < backgroundImg.width) {
            a2.applyForce(0.5, 0)
        }
    }
    if (data == "ArrowDown") {
        document.getElementById("astronautImg2").src = "img/astronaut-front.png"
        if (a2.posy < window.innerHeight - 150) {
            a2.applyForce(0, 0.6)
        }
    }
})

socket.on("updateWreckageCollected", (data) => {
    wreckageCollectedByAnotherUser = data
    console.log(wreckageCollectedByAnotherUser)
    for (let i = 0; i < allWreckages.length; i++) {
        if (wreckageCollectedByAnotherUser[i] != undefined && wreckageCollectedByAnotherUser[i].className == allWreckages[i].className) {
            springs[i] = new Spring(a2, allWreckages[i], 70)
            console.log(springs)
        }
    }
})

socket.on("quit", (data) => {
    astronaut2.removeChild(document.getElementById("astronautImg2"))
    anotherUser = false;
    console.log("you are now the only user here")
})