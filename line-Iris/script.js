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

let scrollingText = document.getElementById("scrollingText")

links.forEach(function(element) {
        element.addEventListener("click", () => {
            scrollingText.innerHTML = `Welcome to the metro line Iris &nbsp;&nbsp;&nbsp;&nbsp; The terminal station is On The Moon &nbsp;&nbsp;&nbsp;&nbsp; Next stop is ${element.innerHTML} &nbsp;&nbsp;&nbsp;&nbsp; please get ready to Exit, from the left side.`
            console.log(element.id)
        })
    })
    // mini1.addEventListener("click", () => {
    //     console.log(scrollingText.innerHTML)
    //     scrollingText.innerHTML = `Welcome to the metro line Iris &nbsp;&nbsp;&nbsp;&nbsp; The terminal station is On The Moon &nbsp;&nbsp;&nbsp;&nbsp; Next stop is Mini Project #6 &nbsp;&nbsp;&nbsp;&nbsp; please get ready to Exit, from the left side.`
    // })