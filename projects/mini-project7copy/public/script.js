let socket = io();
let socketid;
let circleForThisPage = document.getElementsByClassName("circle")[0];
let circleColorR = Math.floor(Math.random() * 255)
let circleColorG = Math.floor(Math.random() * 255)
let circleColorB = Math.floor(Math.random() * 255)

let circleColor = `rgb(${circleColorR},${circleColorG},${circleColorB})`
circleForThisPage.style.backgroundColor = circleColor

let allCircleInfo;

socket.on("socketid", (data) => {
    socketid = data;
    circleForThisPage.id = socketid;
    thiscircleInfo = { socketid: socketid, color: circleColor, posx: 0, posy: 0 }
    socket.emit("circleInfo", thiscircleInfo)
})

socket.on("updatedCircleInfo", (data) => {
    //this data contain all the information about the circles on the page
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        let thisCircle = document.getElementById(data[i].socketid)
        thisCircle.style.left = data[i].posx + 'px';
        thisCircle.style.top = data[i].posy + 'px';
        // thisCircle.style.backgroundColor = data[i].color
    }
})

// socket.on("meetColorChanged", (data) => {
//     for (let i = 0; i < data.length; i++) {
//         let thisCircle = document.getElementById(data[i].socketid)
//         thisCircle.style.backgroundColor = data[i].color
//     }

// })


document.addEventListener("mousemove", (event) => {
    // console.log(allCircleInfo)

    let posx = event.clientX;
    let posy = event.clientY;
    circleForThisPage.style.left = posx + 'px';
    circleForThisPage.style.top = posy + 'px';
    let posData = { socketid: socketid, posx: posx, posy: posy };
    socket.emit("newPos", posData)

    for (let i = 0; i < allCircleInfo.length; i++) {
        if (socketid != allCircleInfo[i].socketid) {
            let thisCircle = document.getElementById(socketid)
                // console.log(allCircleInfo[i].socketid)
            let otherCircle = document.getElementById(allCircleInfo[i].socketid)
            let thisCirclePos = circleForThisPage.getBoundingClientRect();
            let otherCirclePos = otherCircle.getBoundingClientRect();
            if (Math.abs(thisCirclePos.left - otherCirclePos.left) < 50 && Math.abs(thisCirclePos.top - otherCirclePos.top) < 50) {

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
                newColor = `rgb(${newColorR}, ${newColorG}, ${newColorB})`;
                thisCircle.style.backgroundColor = newColor;
                otherCircle.style.backgroundColor = newColor;
                meetData = { "meetCircle1": thisCircle.id, "meetCircle2": otherCircle.id, "newColorR": newColorR, "newColorG": newColorG, "newColorB": newColorB, "newColor": newColor }
                allCircleInfo[i].color = newColor;
                allCircleInfo[0].color = newColor;
                console.log("newcolor", newColor)
                console.log(allCircleInfo)
                console.log(thiscircle.style.backgroundColor)
                console.log(otherCircle.style.backgroundColor)

                socket.emit("meet", meetData)
            }
        }
    }



})

socket.on("newConnection", (data) => {
    // console.log('newConnection')
    // let posx = circleForThisPage.getBoundingClientRect().left;
    // let posy = circleForThisPage.getBoundingClientRect().top;
    // let posData = { socketid: socketid, posx: posx, posy: posy }
    // socket.emit("posNow", posData)

    //append the newly connected circle
    console.log(data)
    allCircleInfo.push(data)
    let newCircle = document.createElement('div');
    newCircle.className = "circle";
    newCircle.style.backgroundColor = data.color;
    newCircle.id = data.socketid
    newCircle.style.left = data.posx + 'px';
    newCircle.style.top = data.posy + 'px';
    document.body.appendChild(newCircle)

})

// socket.on("circlesPosNow", (data) => {
//     //get the updated position of other circles
//     console.log(data)
// })


socket.on("circleInfos", (data) => {
    console.log("circleInfos", data)
    allCircleInfo = data

    for (let i = 0; i < data.length; i++) {
        if (data[i].socketid != socketid) {
            let newCircle = document.createElement('div');
            newCircle.className = "circle";
            newCircle.style.backgroundColor = data[i].color;
            newCircle.id = data[i].socketid
            newCircle.style.left = data[i].posx + 'px';
            newCircle.style.top = data[i].posy + 'px';
            document.body.appendChild(newCircle)

        }
    }
})

socket.on("quit", (data) => {
    let quitCircle = document.getElementById(data);
    quitCircle.remove();
})