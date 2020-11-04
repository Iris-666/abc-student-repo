//scrolling position
console.log("Hi I'm content script!");

window.addEventListener('load', function() {
    // alert("It's loaded!");
    chrome.runtime.sendMessage({ loaded: "pageLoaded" }, function(response) {});
    //send a message to background script when the page is fully loaded
    //then the background script would know it can send message to this tab
    //otherwise the background script may send the message too quick that the tab
    //cannot receive the message.
})


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log(message);
        //get scroll position
        if (message.type = "currentScrollPosition") {
            //get scroll position
            var x = window.scrollX;
            var y = window.scrollY;
            var coords = "X coords: " + x + ", Y coords: " + y;
            console.log(coords);

            let scrollPosition = {
                scrollX: x,
                scrollY: y
            }
            console.log(scrollPosition);
            sendResponse(scrollPosition);
        }

        //get scrolling information
        if (message.bookmarkPos == "bookmarkPos") {
            console.log(`scroll to bookmark position ${message.posY}`)
            window.scrollTo(0, message.posY)
        }

        if (message.whetherBookmark == "bookmarkTrue") {
            console.log(`scroll to bookmark position ${message.posY}`)
            window.scrollTo(0, message.posY)
        }

        //get page visit information from background script
        console.log("this page has been visited " + message.thisPageVisitCount + " times");

        //change background image according to the page visit times
        if (message.thisPageVisitCount > 3) {
            let tagNames = ['div', 'header', 'section', 'main', 'pre', 'table', 'p', 'h3', 'h2', 'h1', 'li', 'tr']
            for (let i = 0; i < tagNames.length; i++) {
                let thisAllTag = document.getElementsByTagName(tagNames[i]);
                for (let j = 0; j < thisAllTag.length; j++) {
                    // thisAllTag[j].style.backgroundColor = "transparent !important";
                    thisAllTag[j].style.setProperty("background", "transparent", "important") //set this css style as important to make sure that it overwrites the original style
                    thisAllTag[j].style.backgroundImage = "none";
                }
            }

            if (message.thisPageVisitCount > 4) {
                //bookworm1
                let windowHeight = window.innerHeight;
                let windowWidth = window.innerWidth;
                let bookworm1 = document.createElement("img");
                bookworm1.src = chrome.extension.getURL("images/bookworm1.gif")
                bookworm1.style.width = 30 + Math.random() * 100 + "px";
                bookworm1.style.position = "absolute";
                bookworm1.style.left = 50 + Math.random() * (windowWidth - 50) + "px";
                bookworm1.style.top = 50 + Math.random() * (windowHeight - 50) + "px";
                document.body.appendChild(bookworm1);

            }


            if (message.thisPageVisitCount > 6) {
                //bookworm2
                let windowHeight = window.innerHeight;
                let windowWidth = window.innerWidth;
                let bookworm2 = document.createElement("img");
                bookworm2.src = chrome.extension.getURL("images/bookworm2.gif")
                bookworm2.style.width = 10 + Math.random() * 100 + "px";
                bookworm2.style.position = "absolute";
                bookworm2.style.left = 50 + Math.random() * (windowWidth - 50) + "px";
                bookworm2.style.top = 50 + Math.random() * (windowHeight - 50) + "px";
                document.body.appendChild(bookworm2);

            }


            if (message.thisPageVisitCount > 8) {
                //bookworm3
                let windowHeight = window.innerHeight;
                let windowWidth = window.innerWidth;
                let bookworm3 = document.createElement("img");
                bookworm3.src = chrome.extension.getURL("images/bookworm3.gif")
                bookworm3.style.width = 30 + Math.random() * 100 + "px";
                bookworm3.style.position = "absolute";
                bookworm3.style.left = 50 + Math.random() * (windowWidth - 50) + "px";
                bookworm3.style.top = 50 + Math.random() * (windowHeight - 50) + "px";
                document.body.appendChild(bookworm3);

            }

            if (message.thisPageVisitCount < 10) {
                // document.body.style.backgroundImage = "url('https://i.pinimg.com/564x/11/29/36/112936939ca1abe3c4615adeeeb42cfb.jpg')"
                document.body.style.setProperty("background-image", " url('https://i.pinimg.com/564x/11/29/36/112936939ca1abe3c4615adeeeb42cfb.jpg')", "important")
            } else if (message.thisPageVisitCount < 20) {
                document.body.style.backgroundImage = "url('https://i.pinimg.com/564x/f0/18/8a/f0188a4680b2ef1ef813b9602b990798.jpg')"

            } else {
                document.body.style.backgroundImage = "url('https://i.pinimg.com/474x/28/10/d6/2810d6f8b870137056dbfaf7645506ba.jpg')"
            }

            // missing words function
            let whetherlostLetter = false;

            let cutTagNames = ['p', 'span', 'h1', 'h2', 'h3', 'li', 'a', 'pre']
            for (let i = 0; i < cutTagNames.length; i++) {
                let thisTag = document.getElementsByTagName(cutTagNames[i]);
                for (let i = 0; i < thisTag.length; i++) {
                    let thisText = thisTag[i].innerText;
                    let thisTextLength = thisText.length;
                    let thisLostLetterNum = 0
                    if (message.thisPageVisitCount < 10) {
                        thisLostLetterNum = Math.floor(mapRange(thisTextLength, 0, 200, 0, 10));
                        whetherlostLetter = true;
                    } else if (message.thisPageVisitCount < 20) {
                        thisLostLetterNum = Math.floor(mapRange(thisTextLength, 0, 200, 0, 30));
                        whetherlostLettere = true;
                    } else {
                        thisLostLetterNum = Math.floor(mapRange(thisTextLength, 0, 200, 0, 50));
                        whetherlostLettere = true;
                    }
                    // if (whetherlostLetter == true) {
                    for (let n = 0; n < thisLostLetterNum; n++) {
                        let lostLetter = Math.floor(Math.random() * thisTextLength);
                        // console.log(thisText[lostLetter])
                        thisText = thisText.replaceAt(lostLetter, `\u00A0`)
                            // console.log(thisText)
                    }
                    thisTag[i].innerText = thisText

                    // }
                }

            }

        }

    })



//Simulating the map function in p5.js
function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    var chars = this.split('');
    chars[index] = replacement;
    return chars.join('');
}
