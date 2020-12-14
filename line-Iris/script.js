let mini1 = document.getElementById("mini1")
let mini2 = document.getElementById("mini2")
let mini3 = document.getElementById("mini3")
let mini4 = document.getElementById("mini4")
let mini5 = document.getElementById("mini5")
let mini6 = document.getElementById("mini6")
let mini7 = document.getElementById("mini7")
let projectA = document.getElementById("projectA")
let projectB = document.getElementById("projectB")
let projectC = document.getElementById("projectC")
let links = [mini1, mini2, mini3, mini4, mini5, mini6, mini7, projectA, projectB, projectC]

let door1 = document.getElementById("metroDoor");
let door2 = document.getElementById("metroDoor2");
let metroBackground = document.getElementById("metroBackground");

let scrollingText = document.getElementById("scrollingText");

door1.style.height = `${metroBackground.height * 0.84}px`
door2.style.height = `${metroBackground.height * 0.84}px`
door1.style.top = `${metroBackground.height * 0.17}px`
door2.style.top = `${metroBackground.height * 0.17}px`


links.forEach(function(element) {
    element.addEventListener("click", () => {
        scrollingText.innerHTML = `Welcome to the metro line Iris &nbsp;&nbsp;&nbsp;&nbsp; The terminal station is On The Moon &nbsp;&nbsp;&nbsp;&nbsp; Next stop is ${element.innerHTML} &nbsp;&nbsp;&nbsp;&nbsp; please get ready to Exit, from the left side.`
        console.log(element.id)
    })
})

window.onload = function() {
    door1.style.animationName = "openDoor";
    door1.style.animationDuration = "5s";
    door1.style.animationIterationCount = "1"
    door2.style.animationName = "openDoor2";
    door2.style.animationDuration = "5s";
    door2.style.animationIterationCount = "1"

    setTimeout(() => {
        metroBackground.style.animationName = 'backgroundEnlarge';
        metroBackground.style.animationDuration = "3s";
        metroBackground.style.animationIterationCount = "1"
        door1.style.display = 'none';
        door2.style.display = 'none';

    }, 4000);

    setTimeout(() => {
        metroBackground.style.display = "none"

    }, 7000);

}

window.addEventListener('resize', () => {
    door1.style.height = `${metroBackground.height * 0.84}px`
    door2.style.height = `${metroBackground.height * 0.84}px`
    door1.style.top = `${metroBackground.height * 0.17}px`
    door2.style.top = `${metroBackground.height * 0.17}px`

})