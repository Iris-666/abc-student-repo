let colorInput = document.getElementById('colorInput')
let sw = screen.width;
let sh = screen.height;
colorInput.addEventListener('change', openWin);
colorInput.style.width = window.innerWidth - 20 + 'px';
colorInput.style.height = window.innerHeight - 20 + 'px';
let i = 0;
let windows = []
window.addEventListener('resize', () => {  //make the color input the same size as the window
    colorInput.style.width = window.innerWidth - 20 + 'px';
    colorInput.style.height = window.innerHeight - 20 + 'px';

})

function openWin() {
    let newWin = new ColorWindow(colorInput.value);
    windows.push(newWin);
    newWin.move();
    let newDiv = newWin.myWindow.document.createElement('div')
    newDiv.id = "newDiv"
    let newContent = newWin.myWindow.document.createTextNode(newWin.rgb); //show the rgb data of the window's background color
    newDiv.appendChild(newContent);
    newWin.myWindow.document.body.appendChild(newDiv)
    if (newWin.value[0] + newWin.value[1] + newWin.value[2] < 300) { //if the background color is dark, make the text white
        newDiv.style.color = 'white'
    } else {
        newDiv.style.color = 'black'
    }

    console.log(windows)

    // let myWindow;
    // let randomX = Math.random()*(sw-200);
    // let randomY = Math.random()*(sh-100);
    // i+=1;
    // myWindow = window.open("", `window${i}`, `height=100,width=200,left=${randomX},top=${randomY}`);
    // console.log(myWindow.name)
    // myWindow.document.body.style.backgroundColor = colorInput.value;
    // myWindow.document.head.title = colorInput.value;

    // let moveInterval = setInterval(windowMove, 50);
    // let spdx = Math.random()*10-5;
    // let spdy = Math.random()*10-5;
    // function windowMove(){
    //     console.log(myWindow.name);
    //     myWindow.moveBy(spdx,spdy);
    //     // console.log(myWindow.screenX,myWindow.screenY)
    //     // console.log(spdx,spdy)
    //     if(myWindow.screenX >= sw-myWindow.innerWidth || myWindow.screenX <= 0){
    //         spdx = -spdx;
    //     }
    //     if(myWindow.screenY >= sh-myWindow.innerHeight-101 || myWindow.screenY <= 24){
    //         spdy = -spdy;
    //     }
    // }
}

setInterval(() => {
    for (let a = 0; a < windows.length; a++) {
        let w = windows[a];
        for (let b = 0; b < windows.length; b++) {
            let other = windows[b];
            if (a != b) {
                // console.log(w.value)
                if (Math.abs(w.myWindow.screenX - other.myWindow.screenX) < 100 && Math.abs(w.myWindow.screenY - other.myWindow.screenY) < 100) {
                    //check if there are two windows collide with each other. if so, mix their background colors 
                    //and change their background color to the mixed color. 

                    // console.log(w.rgb, other.rgb)
                    w.meet(other)
                    let newr = Math.floor((w.value[0] + other.value[0]) / 2);  //use Math.floor() to avoid super long decimals
                    let newg = Math.floor((w.value[1] + other.value[1]) / 2);
                    let newb = Math.floor((w.value[2] + other.value[2]) / 2);


                    // I tried to make the two collided windows disappear if they have the same background color
                    //but this always cause some bugs 
                     // if (w.rgb == other.rgb) {  
                    //     windows.splice(a, 1);
                    //     windows.splice(b, 1)
                    //     w.myWindow.close();
                    //     other.myWindow.close();
                    // }

                    // w.myWindow.resizeBy(-10, -10);
                    // other.myWindow.resizeBy(-10, -10);
                    w.myWindow.document.body.style.backgroundColor = `rgb(${newr}, ${newg}, ${newb})`;
                    other.myWindow.document.body.style.backgroundColor = `rgb(${newr}, ${newg}, ${newb})`;
                    w.myWindow.document.getElementById('newDiv').innerHTML = `rgb(${newr}, ${newg}, ${newb})`
                    other.myWindow.document.getElementById('newDiv').innerHTML = `rgb(${newr}, ${newg}, ${newb})`
                    if (w.value[0] + w.value[1] + w.value[2] < 300) {
                        w.myWindow.document.getElementById('newDiv').style.color = 'white'
                        other.myWindow.document.getElementById('newDiv').style.color = 'white'
                    } else {
                        w.myWindow.document.getElementById('newDiv').style.color = 'black'
                        other.myWindow.document.getElementById('newDiv').style.color = 'black'

                    }
                }
            }
        }
    }
}, 25);

//I tried to write this without using class first, but I changed to class later since I found it might be 
//easier to understand and manage all the variables.
class ColorWindow {
    constructor(color) {
        this.randomX = Math.random() * (sw - 200);
        this.randomY = Math.random() * (sh - 100);
        this.backgroundColor = color;
        this.spdx = Math.random() * 10 - 5;
        this.spdy = Math.random() * 10 - 5;
        this.myWindow = window.open("", ``, `height=100,width=100,left=${this.randomX},top=${this.randomY}`);
        this.value = this.backgroundColor.match(/[A-Za-z0-9]{2}/g);
        this.value = this.value.map(function (v) { return parseInt(v, 16) });
        this.rgb = "rgb(" + this.value.join(",") + ")"; //transform hex to rgb color
        this.r = this.value[0]
        this.g = this.value[1]
        this.b = this.value[2]
    }

    meet(other) {
        this.spdx = -this.spdx;
        this.spdy = -this.spdy;
        this.r = Math.floor((this.value[0] + other.value[0]) / 2);
        this.g = Math.floor((this.value[1] + other.value[1]) / 2);
        this.b = Math.floor((this.value[2] + other.value[2]) / 2);
        this.value = [this.r, this.g, this.b]
        this.rgb = "rgb(" + this.value.join(",") + ")";
    }

    move() {
        this.myWindow.document.body.style.backgroundColor = colorInput.value;
        this.myWindow.document.head.title = colorInput.value;
        setInterval(() => {

            //make the window bounce if reaches the edge of the screen.
            if (this.myWindow.screenX >= sw - this.myWindow.innerWidth || this.myWindow.screenX <= 0) {
                this.spdx = -this.spdx;
            }
            else if (this.myWindow.screenY >= sh - this.myWindow.innerHeight - 101 || this.myWindow.screenY <= 23) {
                this.spdy = -this.spdy;
            }
            this.randomX += this.spdx;
            this.randomY += this.spdy
            this.myWindow.moveTo(this.randomX, this.randomY)

            //window.moveBy() function always cause some unknown bugs. For example, the windows would firstly
            //move to the position (0, 0) from its original generated position.
            //Also, when using moveBy, the windows would stop moving when they are behind the main window, which is quite weird.
            //This issue is not found when using moveTo()
            // this.myWindow.moveBy(this.spdx, this.spdy);
        }, 25);
    }
}