let socket = io();
// let circle = document.getElementById('circle')
let circle = document.getElementsByClassName('circle')[0]
let circleColorR = Math.floor(Math.random() * 255)
let circleColorG = Math.floor(Math.random() * 255)
let circleColorB = Math.floor(Math.random() * 255)

let circleColor = `rgb(${circleColorR},${circleColorG},${circleColorB})`
circle.style.backgroundColor = circleColor
let socketid;
let Allcircles;

let allCircleInfo;
let thisPageCircles = [];


socket.on("socketid", (data) => {
    socketid = data
    circle.id = socketid;
    thisPageCircles.push(socketid)
    circleInfo = { id: socketid, color: circleColor }
    socket.emit("circleInfo", circleInfo)
})

socket.on("circles", (data) => {
    console.log(data)
    Allcircles = data
    let circleAppended = false;
    // console.log(data)
    for (let i = 0; i < thisPageCircles.length; i++) {
        //check if we already have this circle appended
        if (thisPageCircles[i] == data.socketid) {
            //this circle has already been appended 
            //so we don't need to append a new one
            circleAppended = true;
        }
    }

    if (circleAppended == false) {
        //append a new circle
        thisPageCircles.push(data.socketid);
        let newCircle = document.createElement('div');
        newCircle.className = "circle";
        newCircle.style.backgroundColor = data.circleColor;
        newCircle.id = data.socketid;
        newCircle.style.left = data.positionx + 'px';
        newCircle.style.top = data.positiony + 'px';
        document.body.appendChild(newCircle)
    }

    if (circleAppended == true) {
        // console.log(data.socketid)
        // console.log(document.getElementById(data.socketid))
        let thisCircle = document.getElementById(data.socketid);
        thisCircle.style.left = data.positionx + 'px';
        thisCircle.style.top = data.positiony + 'px';
    }

})

document.addEventListener('mousemove', function(e) {
    // console.log("mousemove")
    let left = e.clientX;
    let top = e.clientY;
    circle.style.left = left + 'px';
    circle.style.top = top + 'px';
    let data = { circleColor: circleColor, circleColorR: circleColorR, circleColorG: circleColorG, circleColorB: circleColorB, socketid: socketid, positionx: left, positiony: top }
    socket.emit('message', data)

});


socket.on("broadcast", (data) => {

    for (let i = 0; i < allCircleInfo.length; i++) {
        let thisCircle = document.getElementById(allCircleInfo[i].id);
        thisCirclePos = thisCircle.getBoundingClientRect();
        for (let j = 0; j < allCircleInfo.length; j++) {
            let otherCircle = document.getElementById(allCircleInfo[j].id);
            otherCirclePos = otherCircle.getBoundingClientRect();
            if (i != j) {
                if (Math.abs(thisCirclePos.left - otherCirclePos.left) < 50 && Math.abs(thisCirclePos.top - otherCirclePos.top) < 50) {
                    console.log('two circles meet')
                    thisCircleColor = thisCircle.style.backgroundColor;
                    thisCircleColor = thisCircleColor.split(",")
                    thisCircleColor[0] = parseInt(thisCircleColor[0].substring(4))
                    thisCircleColor[1] = parseInt(thisCircleColor[1].trim());
                    thisCircleColor[2] = thisCircleColor[2].trim();
                    thisCircleColor[2] = parseInt(thisCircleColor[2].substring(0, thisCircleColor[2].length - 1))
                    otherCircleColor = otherCircle.style.backgroundColor;
                    otherCircleColor = otherCircleColor.split(",")
                    otherCircleColor[0] = parseInt(otherCircleColor[0].substring(4))
                    otherCircleColor[1] = parseInt(otherCircleColor[1].trim());
                    otherCircleColor[2] = otherCircleColor[2].trim();
                    otherCircleColor[2] = parseInt(otherCircleColor[2].substring(0, otherCircleColor[2].length - 1))
                    newColorR = Math.floor((thisCircleColor[0] + otherCircleColor[0]) / 2)
                    newColorG = Math.floor((thisCircleColor[1] + otherCircleColor[1]) / 2)
                    newColorB = Math.floor((thisCircleColor[2] + otherCircleColor[2]) / 2)
                    console.log(newColorR)
                    thisCircle.style.backgroundColor = `rgb(${newColorR}, ${newColorG}, ${newColorB})`
                    meetData = { "meetCircle1": thisCircle.id, "meetCircle2": otherCircle.id, "newColorR": newColorR, "newColorG": newColorG, "newColorB": newColorB }

                    socket.emit("meet", meetData)
                }
            }
        }
    }

})

socket.on("quit", (data) => {
    console.log(data)
    let quitCircle = document.getElementById(data);
    quitCircle.remove();
})

socket.on("meet", (data) => {
    console.log(data)
    let thisCircle = document.getElementById(data.meetCircle1)
    let otherCircle = document.getElementById(data.meetCircle2)
    thisCircle.style.backgroundColor = `rgb(${data.newColorR}, ${data.newColorG}, ${data.newColorB})`
    otherCircle.style.backgroundColor = `rgb(${data.newColorR}, ${data.newColorG}, ${data.newColorB})`
})

socket.on("allCircleInfo", (data) => {
    console.log(data)
    allCircleInfo = data;
    for (let i = 0; i < allCircleInfo.length; i++) {
        if (socketid != allCircleInfo[i].id) {
            console.log('new circle')
            let newCircle = document.createElement('div');
            newCircle.className = "circle";
            newCircle.style.backgroundColor = allCircleInfo[i].color;
            newCircle.id = allCircleInfo[i].id;
            newCircle.style.left = 0 + 'px';
            newCircle.style.top = 0 + 'px';
            document.body.appendChild(newCircle)
        }
    }
})

socket.on("someoneConnect", () => {
    let thisCircle = document.getElementById(socketid);
    posx = thisCircle.getBoundingClientRect().left
    posy = thisCircle.getBoundingClientRect().top
    console.log(posx, posy)
    posInfo = { socketid: socketid, posx: posx, posy: posy }
    socket.emit("updatedLocation", posInfo)
})

socket.on("updatedLocationToClients", (data) => {
    console.log(data)
    let thisCircle = document.getElementById(data.socketid);
    thisCircle.style.left = data.posx + 'px';
    thisCircle.style.top = data.posy + 'px';
})