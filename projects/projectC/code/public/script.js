let astronaut = document.getElementById("astronautContainer")
let container = document.getElementById("container")
let astronautImg = document.getElementById('astronautImg')
let astronautSize;
let backgroundImg = document.getElementById("backgroundImg")
let backgroundImgPos = 0;
let wreckageCollected = [];

let wreckageNum = 6;
// let w1 = document.getElementsByClassName("w1")
// let w1Container = document.getElementById("w1Container")
// let w2Container = document.getElementById("w2Container")

let w2Collected = false;

let counter = 0

let allWreckages = [];
// let allwContainers = [w1Container, w2Container]
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
        // display() {
        //     let opa1 = 1;
        //     for (let r = 0; r < 25; r += 1) {
        //         let colorR = mapRange(r, 0, 20, 255, 102);
        //         let colorG = mapRange(r, 0, 20, 255, 186);
        //         let colorB = mapRange(r, 0, 20, 255, 183);
        //         let newCircle = document.createElement("div")
        //         newCircle.style.width = `${r}px`
        //         newCircle.style.height = `${r}px`
        //         newCircle.style.borderRadius = `${r}px`
        //         newCircle.style.backgroundColor = 'transparent'
        //         newCircle.style.border = `rgba(${colorR}, ${colorG},${colorB}, ${opa1}) solid 1px`
        //         newCircle.style.position = "absolute";
        //         // newCircle.style.left = `${this.posx - r/2}px`
        //         // newCircle.style.top = `${this.posy - r/2}px`
        //         newCircle.style.left = `${- r/2}px`
        //         newCircle.style.top = `${- r/2}px`

    //         newCircle.className = this.className
    //         newCircle.style.opacity = opa1
    //         this.containerName.appendChild(newCircle)
    //         opa1 -= 0.03;
    //     }

    //     let opa2 = 0.8
    //     let rad = 50;
    //     for (let r = rad; r > 30; r -= 1) {
    //         let brightness = mapRange(this.velx, 0, 15, 8, 3);
    //         let colorR = mapRange(this.velx, 0, 15, 102, 191);
    //         let colorG = mapRange(this.velx, 0, 15, 186, 236);
    //         let colorB = mapRange(this.velx, 0, 15, 183, 235);
    //         let newCircle = document.createElement("div")
    //         newCircle.style.width = `${r}px`
    //         newCircle.style.height = `${r}px`
    //         newCircle.style.borderRadius = `${r}px`
    //         newCircle.style.backgroundColor = 'transparent'
    //         newCircle.style.border = `rgba(${colorR}, ${colorG},${colorB}, ${opa2}) solid 1px`
    //         newCircle.style.position = "absolute";
    //         // newCircle.style.left = `${this.posx - r/2}px`
    //         // newCircle.style.top = `${this.posy - r/2}px`
    //         newCircle.style.left = `${- r/2}px`
    //         newCircle.style.top = `${- r/2}px`

    //         newCircle.className = "star"
    //         newCircle.style.opacity = opa2
    //         this.containerName.appendChild(newCircle)
    //         opa2 -= 0.02;
    //     }

    //     this.containerName.style.width = rad + 'px';
    //     this.containerName.style.height = rad + 'px';
    //     this.containerName.style.position = "absolute";
    //     this.containerName.style.left = `${this.posx}px`
    //     this.containerName.style.top = `${this.posy}px`



    // }
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
        this.k = 0.1;
    }
    update() {
        let distanceX = a.posx - w1.posx
        let distanceY = a.posy - w1.posy
        let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
        let stretch = distance - this.len;

        //hooke's law
        let mag = -1 * this.k * stretch;
        let forcex = distanceX / distance;
        forcex = forcex * mag
        let forcey = distanceY / distance;
        forcey = forcey * mag
        console.log(forcex, forcey)
        this.ballB.applyForce(-forcex, -forcey)

    }
}

let a = new Astronaut(window.innerWidth / 1.2, window.innerHeight / 1.7)
let w1 = new Wreckage(1000, 400, 'w1')
let w2 = new Wreckage(1800, 500, 'w2')
let w3 = new Wreckage(3900, 400, 'w3')
let w4 = new Wreckage(4800, 500, 'w4')
let w5 = new Wreckage(5200, 400, 'w5')
let w6 = new Wreckage(2500, 400, 'w6')

allWreckages = [w1, w2, w3, w4, w5, w6]
    // w1.display();
    // w2.display();

document.addEventListener("keydown", (data) => {
    if (data.key == "ArrowLeft") {
        astronautImg.src = "img/astronaut-left.png"
        if (a.posx > 0) {
            a.applyForce(-1, 0)
        }
    }
    if (data.key == "ArrowUp") {
        astronautImg.src = "img/astronaut-back.png"
        if (a.posy > window.innerHeight / 1.82) {
            a.applyForce(0, -1)
        }
    }
    if (data.key == "ArrowRight") {
        if (a.posx < backgroundImg.width) {
            a.applyForce(1, 0)
        }
        astronautImg.src = "img/astronaut-right.png"
    }
    if (data.key == "ArrowDown") {
        astronautImg.src = "img/astronaut-front.png"
        if (a.posy < window.innerHeight - 150) {
            a.applyForce(0, 1)
        }
    }

})

setInterval(() => {
    a.update();
    // w1.update();
    // w2.update();

    // console.log(w1, w2)
    for (let i = 0; i < allWreckages.length; i++) {
        allWreckages[i].update();
        if (wreckageCollected[i] != undefined) {
            console.log(wreckageCollected)
            console.log(springs)
            springs[i].update();

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
        // console.log('move canvas')
        backgroundImgPos += Math.abs(a.velx)
        container.style.left = `${backgroundImgPos}px`
    }
    if (astronaut.getBoundingClientRect().left > window.innerWidth - 200) {
        // console.log('move canvas')
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
        // console.log(a.posx)
        a.velx = 0.0;
        a.accx = 0;
    }


    // for (let i = 0; i < allWreckages.length; i++) {
    //     if (allWreckages[i].posx < 0) {
    //         allWreckages[i].velx = 0.0;
    //         allWreckages[i].accx = 0;
    //     }
    //     if (allWreckages[i].posy < 0) {
    //         allWreckages[i].vely = 0.0;
    //         allWreckages[i].accy = 0;
    //     }

    //     if (allWreckages[i].posx > backgroundImg.width) {
    //         allWreckages[i].velx = 0.0;
    //         allWreckages[i].accx = 0;
    //     }
    //     if (allWreckages[i].posy > window.innerHeight) {
    //         allWreckages[i].vely = 0.0;
    //         allWreckages[i].accy = 0;
    //     }
    // }

    for (let i = 0; i < allWreckages.length; i++) {
        if (Math.abs(a.posx - allWreckages[i].posx) < 30 && Math.abs(a.posy - allWreckages[i].posy < 50)) {
            console.log("close to each other")
            wreckageCollected[i] = allWreckages[i]
                // s1 = new Spring(a, w1, 70)
            springs[i] = new Spring(a, allWreckages[i], 70)
                // w1Collected = true;
        }

    }

}, 50);

function mapRange(value, a, b, c, d) { //Simulating the map function in p5.js
    value = (value - a) / (b - a);
    return c + value * (d - c);
}