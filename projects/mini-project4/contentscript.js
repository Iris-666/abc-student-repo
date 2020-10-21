let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

let upperalphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

let chineseAlphabet = ["诶", "必", "司仪", "地", "亿", "哎辅", "计", "哎曲", "爱", "戒", "尅", "哎儿", "哎母", "恩", "欧", "批", "可优", "啊", "哎死", "踢", "优", "微", "答不留", "爱克斯", "外", "子亿"];

let alphabetObject = {
        "a": "诶",
        "b": "必",
        "c": "司仪",
        "d": "地",
        "e": "亿",
        "f": "哎辅",
        "g": "计",
        "h": "哎曲",
        "i": "爱",
        "j": "戒",
        "k": "尅",
        "l": "哎儿",
        "m": "哎母",
        "n": "恩",
        "o": "欧",
        "p": "批",
        "q": "可优",
        "r": "啊",
        "s": "哎死",
        "t": "踢",
        "u": "优",
        "v": "微",
        "w": "答不留",
        "x": "爱克斯",
        "y": "外",
        "z": "子亿"
    }
    // console.log(document.getElementsByTagName('p')[3].innerHTML)

// document.getElementsByTagName('p')[3].innerHTML = document.getElementsByTagName('p')[3].innerHTML.replace(new RegExp("s", "g"), "艾斯");

let allTags = [];
let pTagOrigin = [];
let aTagOrigin = [];
let h3TagOrigin = [];
let h2TagOrigin = [];
let h1TagOrigin = [];

let liTagOrigin = [];
let allpTag = document.getElementsByTagName('p');
allTags.push(allpTag)
let allaTag = document.getElementsByTagName('a');
allTags.push(allaTag)
let allh3Tag = document.getElementsByTagName('h3');
allTags.push(allh3Tag)
let allh2Tag = document.getElementsByTagName('h2');
allTags.push(allh2Tag)
let allh1Tag = document.getElementsByTagName('h1');
allTags.push(allh1Tag)
let allliTag = document.getElementsByTagName('li');
allTags.push(allliTag)


let translate = false;

// for (let i = 0; i < allpTag.length; i++) {
//     let arrayAllpTag = allpTag[i].innerHTML.split('');
//     // console.log(arrayAllpTag);
//     for (let j = 0; j < arrayAllpTag.length; j++) {
//         let thisWord = arrayAllpTag[j];
//         // console.log(thisWord)
//         let translatedWord = alphabet[thisWord];
//         if (translatedWord != undefined) {
//             allpTag[i].innerHTML.replace(thisWord, translatedWord);
//         }
//     }
// }


function gotMessage(request, sender, sendResponse) {
    console.log(request.toggle);
    translate = request.toggle;
    if (translate == true) {
        for (let i = 0; i < allpTag.length; i++) {
            let thispTag = allpTag[i];
            // console.log(thispTag)
            pTagOrigin[i] = thispTag.innerHTML;
            for (let j = 0; j < alphabet.length; j++) {
                if (thispTag.innerHTML.includes('<') == false) {
                    thispTag.innerHTML = thispTag.innerHTML.replace(new RegExp(alphabet[j], "g"), chineseAlphabet[j])
                }
            }
            for (let m = 0; m < upperalphabet.length; m++) {
                if (thispTag.innerHTML.includes('<') == false) {
                    thispTag.innerHTML = thispTag.innerHTML.replace(new RegExp(upperalphabet[m], "g"), chineseAlphabet[m])
                }
            }
        }
        for (let i = 0; i < allaTag.length; i++) {
            let thisaTag = allaTag[i];
            aTagOrigin[i] = thisaTag.innerHTML;
            console.log(thisaTag.innerHTML)
            for (let j = 0; j < alphabet.length; j++) {
                if (thisaTag.innerHTML.includes('<') == false) {
                    thisaTag.innerHTML = thisaTag.innerHTML.replace(new RegExp(alphabet[j], "g"), chineseAlphabet[j])
                }
            }
            for (let m = 0; m < upperalphabet.length; m++) {
                if (thisaTag.innerHTML.includes('<') == false) {
                    thisaTag.innerHTML = thisaTag.innerHTML.replace(new RegExp(upperalphabet[m], "g"), chineseAlphabet[m])
                }
            }
        }

        for (let i = 0; i < allh3Tag.length; i++) {
            let thish3Tag = allh3Tag[i];
            h3TagOrigin[i] = thish3Tag.innerHTML
                // console.log(thish3Tag.innerHTML)
            for (let j = 0; j < alphabet.length; j++) {
                if (thish3Tag.innerHTML.includes('<') == false) {
                    thish3Tag.innerHTML = thish3Tag.innerHTML.replace(new RegExp(alphabet[j], "g"), chineseAlphabet[j])
                }
            }
            for (let m = 0; m < upperalphabet.length; m++) {
                if (thish3Tag.innerHTML.includes('<') == false) {
                    thish3Tag.innerHTML = thish3Tag.innerHTML.replace(new RegExp(upperalphabet[m], "g"), chineseAlphabet[m])
                }
            }
        }

        for (let i = 0; i < allh2Tag.length; i++) {
            let thish2Tag = allh2Tag[i];
            h2TagOrigin[i] = thish2Tag.innerHTML
                // console.log(thish2Tag.innerHTML)
            for (let j = 0; j < alphabet.length; j++) {
                if (thish2Tag.innerHTML.includes('<') == false) {
                    thish2Tag.innerHTML = thish2Tag.innerHTML.replace(new RegExp(alphabet[j], "g"), chineseAlphabet[j])
                }
            }
            for (let m = 0; m < upperalphabet.length; m++) {
                if (thish2Tag.innerHTML.includes('<') == false) {
                    thish2Tag.innerHTML = thish2Tag.innerHTML.replace(new RegExp(upperalphabet[m], "g"), chineseAlphabet[m])
                }
            }
        }

        for (let i = 0; i < allh1Tag.length; i++) {
            let thish1Tag = allh1Tag[i];
            h1TagOrigin[i] = thish1Tag.innerHTML
                // console.log(thish1Tag.innerHTML)
            for (let j = 0; j < alphabet.length; j++) {
                if (thish1Tag.innerHTML.includes('<') == false) {
                    thish1Tag.innerHTML = thish1Tag.innerHTML.replace(new RegExp(alphabet[j], "g"), chineseAlphabet[j])
                }
            }
            for (let m = 0; m < upperalphabet.length; m++) {
                if (thish1Tag.innerHTML.includes('<') == false) {
                    thish1Tag.innerHTML = thish1Tag.innerHTML.replace(new RegExp(upperalphabet[m], "g"), chineseAlphabet[m])
                }
            }
        }



        for (let i = 0; i < allliTag.length; i++) {
            let thisliTag = allliTag[i];
            liTagOrigin[i] = thisliTag.innerHTML
                // console.log(thish3Tag.innerHTML)
            for (let j = 0; j < alphabet.length; j++) {
                if (thisliTag.innerHTML.includes('<') == false) {
                    thisliTag.innerHTML = thisliTag.innerHTML.replace(new RegExp(alphabet[j], "g"), chineseAlphabet[j])
                }
            }
            for (let m = 0; m < upperalphabet.length; m++) {
                if (thisliTag.innerHTML.includes('<') == false) {
                    thisliTag.innerHTML = thisliTag.innerHTML.replace(new RegExp(upperalphabet[m], "g"), chineseAlphabet[m])
                }
            }
        }



        let inputValue = document.getElementsByTagName('input')
        for (let i = 0; i < inputValue.length; i++) {
            inputValue[i].addEventListener('input', () => {
                console.log(inputValue[i].value)
                for (let j = 0; j < alphabet.length; j++) {
                    inputValue[i].value = inputValue[i].value.replace(new RegExp(alphabet[j], "g"), chineseAlphabet[j])
                }
            })
        }
    }



    if (translate == false && pTagOrigin.length > 0) {
        for (let i = 0; i < allpTag.length; i++) {
            let thispTag = allpTag[i];
            if (thispTag.innerHTML.includes('<') == false) {
                thispTag.innerHTML = pTagOrigin[i];
            }
        }

        for (let i = 0; i < allaTag.length; i++) {
            let thisaTag = allaTag[i];
            // console.log(aTagOrigin[i])

            if (thisaTag.innerHTML.includes('<') == false) {
                thisaTag.innerHTML = aTagOrigin[i];
            }
        }

        for (let i = 0; i < allh3Tag.length; i++) {
            let thish3Tag = allh3Tag[i];
            if (thish3Tag.innerHTML.includes('<') == false) {
                thish3Tag.innerHTML = h3TagOrigin[i];
            }
        }

        for (let i = 0; i < allh2Tag.length; i++) {
            let thish2Tag = allh2Tag[i];
            if (thish2Tag.innerHTML.includes('<') == false) {
                thish2Tag.innerHTML = h2TagOrigin[i];
            }
        }
        for (let i = 0; i < allh1Tag.length; i++) {
            let thish1Tag = allh1Tag[i];
            if (thish1Tag.innerHTML.includes('<') == false) {
                thish1Tag.innerHTML = h1TagOrigin[i];
            }
        }



        for (let i = 0; i < allliTag.length; i++) {
            let thisliTag = allliTag[i];
            if (thisliTag.innerHTML.includes('<') == false) {
                thisliTag.innerHTML = liTagOrigin[i];
            }
        }



        let inputValue = document.getElementsByTagName('input')
        for (let i = 0; i < inputValue.length; i++) {
            inputValue[i].addEventListener('input', () => {
                console.log(inputValue[i].value)
                for (let j = 0; j < alphabet.length; j++) {
                    inputValue[i].value = inputValue[i].value.replace(new RegExp(chineseAlphabet[j], "g"), alphabet[j])
                }
            })
        }

    }
}

chrome.runtime.onMessage.addListener(gotMessage);