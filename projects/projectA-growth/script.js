let branch1 = document.getElementById('branch1');
let branch2 = document.getElementById('branch2');
let branch3 = document.getElementById('branch3');
let branch4 = document.getElementById('branch4');
let branch5 = document.getElementById('branch5');
let branch6 = document.getElementById('branch6');
let branch7 = document.getElementById('branch7');
let branch8 = document.getElementById('branch8');
let branch9 = document.getElementById('branch9');
let branch10 = document.getElementById('branch10');
let branch11 = document.getElementById('branch11');
let branch12 = document.getElementById('branch12');
let branch13 = document.getElementById('branch13');
let branch14 = document.getElementById('branch14');

let branch2Width = 0;
let branch2Left = 105;
let branch2Bottom = 240;
let branch3Width = 0;
let branch3Left = 95;
let branch3Bottom = 245;
let branch4Width = 0;
let branch4Left = 45;
let branch4Bottom = 360
let branch5Width = 0;
let branch5Left = 45;
let branch5Bottom = 360
let branch6Width = 0;
let branch6Left = 45;
let branch6Bottom = 360
let branch7Width = 0;
let branch7Left = 45;
let branch7Bottom = 360
let branch8Width = 0;
let branch8Left = 45;
let branch8Bottom = 360
let branch9Width = 0;
let branch9Left = 45;
let branch9Bottom = 360
let branch10Width = 0;
let branch10Left = 45;
let branch10Bottom = 360
let branch11Width = 0;
let branch11Left = 45;
let branch11Bottom = 360
let branch12Width = 0;
let branch12Left = 45;
let branch12Bottom = 360
let branch13Width = 0;
let branch13Left = 45;
let branch13Bottom = 360
let branch14Width = 0;
let branch14Left = 45;
let branch14Bottom = 360

let leavesCount1 = 0
let leavesCount2 = 0
let leavesCount3 = 0
let leavesCount4 = 0
let leavesCount5 = 0
let leavesCount6 = 0
let leavesCount7 = 0
let leavesCount8 = 0
let leavesCount9 = 0
let leavesCount10 = 0
let leavesCount11 = 0
let leavesCount12 = 0
let leavesCount13 = 0
let leavesCount14 = 0
let leavesCount15 = 0

setInterval(() => {
    branch1.value = Number(branch1.value) + 0.2
        // console.log(branch1.value)

    if (branch1.value == 100) {
        branch2.value = Number(branch2.value) + 0.4
        branch3.value = Number(branch3.value) + 0.4
    }
    if (branch2.value == 100) {
        branch4.value = Number(branch4.value) + 0.4
        branch5.value = Number(branch5.value) + 0.4
        branch14.value = Number(branch14.value) + 0.4
    }
    if (branch3.value == 100) {
        branch6.value = Number(branch6.value) + 0.4
        branch7.value = Number(branch7.value) + 0.4
    }
    if (branch4.value == 100) {
        branch8.value = Number(branch8.value) + 0.5
    }
    if (branch5.value == 100) {
        branch9.value = Number(branch9.value) + 0.5
        branch10.value = Number(branch10.value) + 0.5
    }
    if (branch6.value == 100) {
        branch11.value = Number(branch11.value) + 0.5
        branch12.value = Number(branch12.value) + 0.5
    }
    if (branch7.value == 100) {
        branch13.value = Number(branch13.value) + 0.5
    }

    //let the start point of each branch appear when the former branch grow.
    branch2.style.opacity = mapRange(branch1.value, 25, 50, 0, 1)
    branch3.style.opacity = mapRange(branch1.value, 25, 50, 0, 1)
    branch4.style.opacity = mapRange(branch2.value, 25, 50, 0, 1)
    branch5.style.opacity = mapRange(branch2.value, 25, 50, 0, 1)
    branch6.style.opacity = mapRange(branch3.value, 25, 50, 0, 1)
    branch7.style.opacity = mapRange(branch3.value, 25, 50, 0, 1)
    branch8.style.opacity = mapRange(branch4.value, 25, 50, 0, 1)
    branch9.style.opacity = mapRange(branch5.value, 25, 50, 0, 1)
    branch10.style.opacity = mapRange(branch5.value, 25, 50, 0, 1)
    branch11.style.opacity = mapRange(branch6.value, 25, 50, 0, 1)
    branch12.style.opacity = mapRange(branch6.value, 25, 50, 0, 1)
    branch13.style.opacity = mapRange(branch7.value, 25, 50, 0, 1)
    branch14.style.opacity = mapRange(branch2.value, 35, 50, 0, 1)

    if (branch1.value > 50 && branch2Width <= 150) {
        branch2Width = mapRange(branch1.value, 50, 100, 0, 150)
        branch2Bottom = mapRange(branch1.value, 50, 100, 240, 305)
        branch2Left = mapRange(branch1.value, 50, 100, 105, -5)
        branch2.style.width = branch2Width + 'px'
        branch2.style.bottom = branch2Bottom + 'px'
        branch2.style.left = branch2Left + 'px'
    }

    if (branch1.value > 50 && branch3Width <= 150) {
        branch3Width = mapRange(branch1.value, 50, 100, 0, 150)
        branch3Bottom = mapRange(branch1.value, 50, 100, 245, 290)
        branch3Left = mapRange(branch1.value, 50, 100, 95, 77)
        branch3.style.width = branch3Width + 'px'
        branch3.style.bottom = branch3Bottom + 'px'
        branch3.style.left = branch3Left + 'px'
    }

    if (branch2.value > 50 && branch4Width <= 100) {
        branch4Width = mapRange(branch2.value, 50, 100, 0, 100)
        branch4Bottom = mapRange(branch2.value, 50, 100, 360, 390)
        branch4Left = mapRange(branch2.value, 50, 100, 45, -40)
        branch4.style.width = branch4Width + 'px'
        branch4.style.bottom = branch4Bottom + 'px'
        branch4.style.left = branch4Left + 'px'
    }

    if (branch2.value > 50 && branch5Width <= 100) {
        branch5Width = mapRange(branch2.value, 50, 100, 0, 100)
        branch5Bottom = mapRange(branch2.value, 50, 100, 357, 408)
        branch5Left = mapRange(branch2.value, 50, 100, 40, 0)
        branch5.style.width = branch5Width + 'px'
        branch5.style.bottom = branch5Bottom + 'px'
        branch5.style.left = branch5Left + 'px'
    }

    if (branch3.value > 50 && branch6Width <= 100) {
        branch6Width = mapRange(branch3.value, 50, 100, 0, 100)
        branch6Bottom = mapRange(branch3.value, 50, 100, 325, 375)
        branch6Left = mapRange(branch3.value, 50, 100, 205, 145)
        branch6.style.width = branch6Width + 'px'
        branch6.style.bottom = branch6Bottom + 'px'
        branch6.style.left = branch6Left + 'px'
    }

    if (branch3.value > 50 && branch7Width <= 100) {
        branch7Width = mapRange(branch3.value, 50, 100, 0, 100)
        branch7Bottom = mapRange(branch3.value, 50, 100, 332, 347)
        branch7Left = mapRange(branch3.value, 50, 100, 197, 195)
        branch7.style.width = branch7Width + 'px'
        branch7.style.bottom = branch7Bottom + 'px'
        branch7.style.left = branch7Left + 'px'
    }

    if (branch4.value > 50 && branch8Width <= 100) {
        branch8Width = mapRange(branch4.value, 50, 100, 0, 100)
        branch8Bottom = mapRange(branch4.value, 50, 100, 417, 427)
        branch8Left = mapRange(branch4.value, 50, 100, -15, -115)
        branch8.style.width = branch8Width + 'px'
        branch8.style.bottom = branch8Bottom + 'px'
        branch8.style.left = branch8Left + 'px'
    }

    if (branch5.value > 50 && branch9Width <= 80) {
        branch9Width = mapRange(branch5.value, 50, 100, 0, 80)
        branch9Bottom = mapRange(branch5.value, 50, 100, 448, 478)
        branch9Left = mapRange(branch5.value, 50, 100, 62, -2)
        branch9.style.width = branch9Width + 'px'
        branch9.style.bottom = branch9Bottom + 'px'
        branch9.style.left = branch9Left + 'px'
    }

    if (branch5.value > 50 && branch10Width <= 80) {
        branch10Width = mapRange(branch5.value, 50, 100, 0, 80)
        branch10Bottom = mapRange(branch5.value, 50, 100, 448, 472)
        branch10Left = mapRange(branch5.value, 50, 100, 52, 43)
        branch10.style.width = branch10Width + 'px'
        branch10.style.bottom = branch10Bottom + 'px'
        branch10.style.left = branch10Left + 'px'
    }

    if (branch6.value > 50 && branch11Width <= 80) {
        branch11Width = mapRange(branch6.value, 50, 100, 0, 80)
        branch11Bottom = mapRange(branch6.value, 50, 100, 412, 443)
        branch11Left = mapRange(branch6.value, 50, 100, 190, 130)
        branch11.style.width = branch11Width + 'px'
        branch11.style.bottom = branch11Bottom + 'px'
        branch11.style.left = branch11Left + 'px'
    }

    if (branch6.value > 50 && branch12Width <= 100) {
        branch12Width = mapRange(branch6.value, 50, 100, 0, 100)
        branch12Bottom = mapRange(branch6.value, 50, 100, 414, 452)
        branch12Left = mapRange(branch6.value, 50, 100, 183, 163)
        branch12.style.width = branch12Width + 'px'
        branch12.style.bottom = branch12Bottom + 'px'
        branch12.style.left = branch12Left + 'px'
    }

    if (branch7.value > 50 && branch13Width <= 90) {
        branch13Width = mapRange(branch7.value, 50, 100, 0, 90)
        branch13Bottom = mapRange(branch7.value, 50, 100, 355, 397)
        branch13Left = mapRange(branch7.value, 50, 100, 282, 255)
        branch13.style.width = branch13Width + 'px'
        branch13.style.bottom = branch13Bottom + 'px'
        branch13.style.left = branch13Left + 'px'
    }

    if (branch2.value > 50 && branch14Width <= 90) {
        branch14Width = mapRange(branch2.value, 50, 100, 0, 90)
        branch14Bottom = mapRange(branch2.value, 50, 100, 295, 340)
        branch14Left = mapRange(branch2.value, 50, 100, 70, 40)
        branch14.style.width = branch14Width + 'px'
        branch14.style.bottom = branch14Bottom + 'px'
        branch14.style.left = branch14Left + 'px'
    }


}, 50);

setInterval(() => {
    if (branch4.value > 0 && leavesCount1 < 50) {
        // console.log('append leaves')
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer1').appendChild(newLeaf)
        leavesCount1 += 1
        newLeaf.style.left = Math.random() * 150 + 'px'
        newLeaf.style.top = Math.random() * 20 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"

    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch6.value > 0 && leavesCount2 < 50) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer2').appendChild(newLeaf)
        leavesCount2 += 1
        newLeaf.style.left = Math.random() * 150 + 'px'
        newLeaf.style.top = Math.random() * 20 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"

    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch8.value > 0 && leavesCount3 < 40) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer3').appendChild(newLeaf)
        leavesCount3 += 1
        newLeaf.style.left = Math.random() * 100 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"

    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch9.value > 0 && leavesCount4 < 40) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer4').appendChild(newLeaf)
        leavesCount4 += 1
        newLeaf.style.left = Math.random() * 100 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch11.value > 0 && leavesCount5 < 40) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer5').appendChild(newLeaf)
        leavesCount5 += 1
        newLeaf.style.left = Math.random() * 100 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch13.value > 0 && leavesCount6 < 40) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer6').appendChild(newLeaf)
        leavesCount6 += 1
        newLeaf.style.left = Math.random() * 90 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch14.value == 100 && leavesCount7 < 30) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer7').appendChild(newLeaf)
        leavesCount7 += 1
        newLeaf.style.left = Math.random() * 100 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch8.value == 100 && leavesCount8 < 30) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer8').appendChild(newLeaf)
        leavesCount8 += 1
        newLeaf.style.left = Math.random() * 90 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch9.value == 100 && leavesCount9 < 30) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer9').appendChild(newLeaf)
        leavesCount9 += 1
        newLeaf.style.left = Math.random() * 80 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch10.value == 100 && leavesCount10 < 30) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer10').appendChild(newLeaf)
        leavesCount10 += 1
        newLeaf.style.left = Math.random() * 80 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch11.value == 100 && leavesCount11 < 30) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer11').appendChild(newLeaf)
        leavesCount11 += 1
        newLeaf.style.left = Math.random() * 80 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch12.value == 100 && leavesCount12 < 30) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer12').appendChild(newLeaf)
        leavesCount12 += 1
        newLeaf.style.left = Math.random() * 80 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch13.value == 100 && leavesCount13 < 30) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer13').appendChild(newLeaf)
        leavesCount13 += 1
        newLeaf.style.left = Math.random() * 80 + 'px'
        newLeaf.style.top = Math.random() * 18 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch5.value == 100 && leavesCount14 < 50) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer14').appendChild(newLeaf)
        leavesCount14 += 1
        newLeaf.style.left = Math.random() * 100 + 'px'
        newLeaf.style.top = Math.random() * 40 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

setInterval(() => {
    if (branch6.value == 100 && leavesCount15 < 50) {
        let newLeaf = document.createElement('div')
        newLeaf.className = "leaves"
        document.getElementById('leavesContainer15').appendChild(newLeaf)
        leavesCount15 += 1
        newLeaf.style.left = Math.random() * 100 + 'px'
        newLeaf.style.top = Math.random() * 40 + 'px'
        leafSize = Math.random() * 10 + 8
        newLeaf.style.width = leafSize + 'px'
        newLeaf.style.height = leafSize + 'px'
        leafColorS = Math.random() * (61 - 46) + 46
        leafColorL = Math.random() * (55 - 42) + 42
        newLeaf.style.backgroundColor = "hsl(124, " + leafColorS + "%," + leafColorL + "%)"
    }
}, Math.random() * 2000 + 500);

function mapRange(value, a, b, c, d) { //this function simulate the map function in p5js
    value = (value - a) / (b - a);
    return c + value * (d - c);
}