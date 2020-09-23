document.body.onload = start;
//onload only accpet one function
let inputArray = ['rangeInput', 'fileInput', 'fileInputGoogle', 'dateInput', 'colorInput', 'passwordInput']
let divAmount = 100


function start() {
    let divAmount = 100
    let divWidth = window.innerWidth / divAmount
    let rangeValue = rangeInput.value;

    for (let i = 0; i < divAmount; i++) {
        let rangenewDiv = document.createElement("div");
        let newDivColor = mapRange(i, 0, divAmount, 0, 360)
        rangenewDiv.style.width = divWidth + 'px'
        rangenewDiv.style.height = '50px'
        rangenewDiv.style.position = "absolute"
        rangenewDiv.style.top += rangeValue * randomNums[i] + 'px'
        rangenewDiv.style.left = divWidth * i + 'px'
        rangenewDiv.style.backgroundColor = 'hsl(' + newDivColor + ', 40%, 70%)'
        rangenewDiv.id = "div" + i;
        rangenewDiv.className = "rangenewDiv"
        document.body.appendChild(rangenewDiv)
    }

}

function mapRange(value, a, b, c, d) { //Simulating the map function in p5.js
    value = (value - a) / (b - a);
    return c + value * (d - c);
}

let clearbt = document.getElementById('clearbt')
clearbt.addEventListener('click', function () {
    location.reload()
})

let rangeInput = document.getElementById('rangeInput')
rangeInput.addEventListener('input', range1)

let fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', file1)

let fileInputGoogle = document.getElementById('fileInputGoogle')
fileInputGoogle.addEventListener('change', fileGoogle)

let dateInput = document.getElementById('dateInput')
dateInput.addEventListener('change', date1)

let colorInput = document.getElementById('colorInput')
colorInput.addEventListener('change', color1)


let randomNums = [];
for (let i = 0; i < 100; i++) {  //generate an array of random numbers
    randomNums.push(Math.random() * 5 + 2)
}

function range1() {
    let divAmount = 100
    let divWidth = window.innerWidth / divAmount
    let rangeValue = rangeInput.value;
    // let allNewDiv = document.getElementsByClassName('newDiv')

    for (let i = 0; i < divAmount; i++) {
        let rangenewDiv = document.createElement("div");
        let newDivColor = mapRange(i, 0, divAmount, 0, 360)
        rangenewDiv.style.width = divWidth + 'px'
        rangenewDiv.style.height = divWidth + 'px'
        rangenewDiv.style.position = "absolute"
        // rangenewDiv.style.borderRadius = "10px"
        rangenewDiv.style.top += rangeValue * randomNums[i] + 'px'
        rangenewDiv.style.left = divWidth * i + 'px'
        rangenewDiv.style.backgroundColor = 'hsl(' + newDivColor + ', 40%, 70%)'
        rangenewDiv.id = "div" + i;
        rangenewDiv.className = "rangenewDiv"
        document.body.appendChild(rangenewDiv)
    }

}

function file1() {
    var fileList = fileInput.files;
    console.log(fileList[0])
    let filename = fileList[0].name;
    let filesize = fileList[0].size;
    let fileNameArray = filename.split('')
    for (let i = 0; i < fileNameArray.length; i++) {
        let filenewDiv = document.createElement("div");
        let newDivColor = mapRange(i, 0, fileNameArray.length, 0, 360)
        filenewDiv.style.position = "absolute"
        filenewDiv.style.top = Math.random() * (window.innerHeight - 100) + 50 + 'px'
        filenewDiv.style.left = Math.random() * (window.innerWidth) + 'px'
        filenewDiv.style.color = 'hsl(' + newDivColor + ', 40%, 70%)'
        filenewDiv.style.fontSize = mapRange(i, 0, fileNameArray.length, 18, 80) + 'px'
        filenewDiv.className = "filenewDiv"
        filenewDiv.id = 'filenewDiv' + i
        let newContent = document.createTextNode(fileNameArray[i]);
        filenewDiv.appendChild(newContent);
        document.body.appendChild(filenewDiv)
    }
    // document.getElementById("newDiv1").animate([ //experimenting on js animate, but it's a function still in experimentation.
    //     { transform: 'translateY(0px)' }, 
    //     { transform: 'translateY(-300px)' }
    //   ], { 
    //     duration: 5000,
    //     iterations: Infinity
    //   });

    var intervalRotate = setInterval(move, 10); //make the words rotate and move

    let randomNumsNeg = [];
    for (let i = 0; i < 100; i++) {
        randomNumsNeg.push(Math.random())
    }

    let allNewDiv = document.getElementsByClassName('filenewDiv')
    let randomRotatedeg = []
    for (let i = 0; i < allNewDiv.length; i++) {
        randomRotatedeg.push(Math.random() * 10 - 5)
    }

    let randomMovingDis = []
    for (let i = 0; i < allNewDiv.length; i++) {
        randomMovingDis.push(Math.random() * 10 - 5)
    }
    let randomMovingDisHor = []
    for (let i = 0; i < allNewDiv.length; i++) {
        randomMovingDisHor.push(Math.random() * 10 - 5)
    }
    let randomMovingSpd = []
    for (let i = 0; i < allNewDiv.length; i++) {
        randomMovingSpd.push(Math.random() * 6 - 3)
    }
    let randomMovingSpdHor = []
    for (let i = 0; i < allNewDiv.length; i++) {
        randomMovingSpdHor.push(Math.random() * 6 - 3)
    }

    function move() {
        // console.log(allNewDiv[0].offsetLeft)
        for (let i = 0; i < allNewDiv.length; i++) {
            // console.log(randomNumsNeg[i])
            if (randomRotatedeg[i] > 45) {
                randomNumsNeg[i] = -randomNumsNeg[i]
            } else if (randomRotatedeg[i] < -45) {
                randomNumsNeg[i] = -randomNumsNeg[i]
            }
            if (randomMovingDis[i] > 45) {
                randomMovingSpd[i] = -randomMovingSpd[i]
            } else if (randomMovingDis[i] < -45) {
                randomMovingSpd[i] = -randomMovingSpd[i]
            }

            if (allNewDiv[i].offsetLeft > window.innerWidth || allNewDiv[i].offsetLeft < 0) { //the offsetLeft seems not working? to be solved
                randomMovingSpdHor[i] = -randomMovingSpdHor[i]
            }
            randomRotatedeg[i] += randomNumsNeg[i]
            randomMovingDis[i] += randomMovingSpd[i]
            randomMovingDisHor[i] += randomMovingSpdHor[i]
            allNewDiv[i].style.transform = "translate(" + randomMovingDisHor[i] + "px," + randomMovingDis[i] + "px)" + "rotate(" + randomRotatedeg[i] + "deg)"
            //the translate and rotate must be changed together
            //if changed them in seperate functions, the former one would not work
        }
    }
}

function fileGoogle() {
    fileToGoogle = fileInputGoogle.files[0].name
    console.log(fileToGoogle)
    window.open('http://www.google.com/search?q=' + fileToGoogle, '_blank');
}

let colorCount = 0

function color1() {
    colorCount += 1
    let colornewDiv = document.createElement("div");
    let color = colorInput.value
    var value = color.match(/[A-Za-z0-9]{2}/g);
    value = value.map(function (v) { return parseInt(v, 16) });
    let rgb = "rgb(" + value.join(",") + ")"; //transform hex to rgb color
    // console.log(value)
    let rgbSum = value[0] + value[1] + value[2]
    let size = mapRange(rgbSum, 0, 765, 1, 100)

    colornewDiv.style.backgroundColor = colorInput.value;
    colornewDiv.style.position = "absolute"
    colornewDiv.style.left = Math.random() * window.innerWidth + 'px';
    colornewDiv.style.top = Math.random() * window.innerHeight + 'px';
    colornewDiv.style.height = size + "px";
    colornewDiv.style.width = size + "px";
    colornewDiv.className = 'colornewDiv';
    colornewDiv.id = 'colornewDiv' + colorCount;
    document.body.appendChild(colornewDiv);

    setInterval(moveColor, 10);

    let randomRotatedeg = Math.random() * 10 - 5;
    let randomRotateNum = Math.random();
    let randomMovingDis = 0;
    let randomMovingDisHor = 0;
    let randomMovingSpd = Math.random() * 6 - 3
    let randomMovingSpdHor = Math.random() * 6 - 3

    function moveColor() {
        if (randomRotatedeg > 45) {
            randomRotateNum = -randomRotateNum
        } else if (randomRotatedeg < -45) {
            randomRotateNum = -randomRotateNum
        }
        if (randomMovingDis > 45) {
            randomMovingSpd = -randomMovingSpd
        } else if (randomMovingDis < -45) {
            randomMovingSpd = -randomMovingSpd
        }
        randomRotatedeg += randomRotateNum
        randomMovingDis += randomMovingSpd
        randomMovingDisHor += randomMovingSpdHor

        colornewDiv.style.transform = "translate(" + randomMovingDisHor + "px," + randomMovingDis + "px)" + "rotate(" + randomRotatedeg + "deg)"
    }

}

function date1(){
    let dateArray = dateInput.value.split('-')
    console.log(parseInt(dateArray[1]))
    let year = parseInt(dateArray[0])
    let month = parseInt(dateArray[1])
    let day = parseInt(dateArray[2])
    for (let i = 0; i < month; i++) {
        let newBox = document.createElement("input");
        newBox.type = "checkBox"
        newBox.style.width = mapRange(month, 1, 12, 5, 50) + 'px'
        newBox.style.height = mapRange(month, 1, 12, 5, 50) + 'px'
        newBox.style.position = "absolute"
        newBox.style.borderRadius = "10px"
        newBox.style.left = Math.random()*window.innerWidth + 'px'
        newBox.style.top = Math.random()*window.innerHeight + 'px'
        newBox.id = "monthbox" + i;
        document.body.appendChild(newBox);
        document.getElementById('monthbox'+i).checked = true;
    }

    for (let i = 0; i < day; i++) {
        let newBox = document.createElement("input");
        newBox.type = "checkBox"
        newBox.style.width = mapRange(day, 1, 31, 5, 50) + 'px'
        newBox.style.height = mapRange(day, 1, 31, 5, 50) + 'px'
        newBox.style.position = "absolute"
        newBox.style.borderRadius = "10px"
        newBox.style.left = Math.random()*window.innerWidth + 'px'
        newBox.style.top = Math.random()*window.innerHeight + 'px'
        newBox.id = "daybox" + i;
        document.body.appendChild(newBox);
        document.getElementById('daybox'+i).checked = false;
    }


}

function addcheckBox() {
    for (let i = 0; i < divAmount; i++) {
        let newBox = document.createElement("input");
        newBox.type = "checkBox"
        let newDivColor = mapRange(i, 0, divAmount, 0, 360)
        newBox.style.width = divWidth + 'px'
        newBox.style.height = divWidth + 'px'
        newBox.style.position = "absolute"
        newBox.style.borderRadius = "10px"
        newBox.style.left = divWidth * i + 'px'
        newBox.style.top = '100px'
        newBox.style.backgroundColor = 'hsl(' + newDivColor + ', 40%, 70%)'
        newBox.id = "box" + i;
        let currentBox = document.getElementById("div2");
        document.body.appendChild(newBox);
    }
}