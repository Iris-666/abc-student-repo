let container = document.getElementsByClassName('upperContainer')[0];
let introVideo = document.getElementById('introVideo');
let text = document.getElementById('text');
let text2 = document.getElementById('text2');
let text3 = document.getElementById('text3');
let text4 = document.getElementById('text4');
let text5 = document.getElementById('text5');
let text6 = document.getElementById('text6');

let w1circle = document.getElementById('w1container');
let infobox = document.getElementById('info');
let clickme = document.getElementById('clickme');
let clickTocontinue = document.getElementById('continue');

let start = document.getElementById('start');
let startbt = document.getElementById("startbt")

if (document.images) {
    img1 = new Image();
    img1.src = "img/backgroundLongLow.jpg";
    img2 = new Image();
    img2.src = "img/astronaut-back.png";
    img3 = new Image();
    img3.src = "img/astronaut-front.png";
    img4 = new Image();
    img4.src = "img/astronaut-left.png";
    img5 = new Image();
    img5.src = "img/astronaut-right.png";
    img6 = new Image();
    img6.src = "img/wreckage1.png";
}


startbt.addEventListener("click", () => {
    introVideo.play();
    startbt.style.display = 'none'
})


introVideo.addEventListener('click', () => {
    introVideo.play();
    setTimeout(() => {
        introVideo.style.display = "none";
    }, 20000)

    setTimeout(() => {
        text.style.animationName = "typing";
    }, 20000)

    setTimeout(() => {
        text.style.opacity = "1";
        clickme.style.opacity = "1";
    }, 20000)
})

w1container.addEventListener('click', () => {

    text.style.display = "none";
    text2.style.display = "block";
    text2.style.animationName = "typing";

    clickme.style.display = "none";

    setTimeout(() => {
        text3.style.opacity = '1';
        text3.style.animationName = "typing";
    }, 3000)

    setTimeout(() => {
        clickTocontinue.style.opacity = '1';

        document.body.addEventListener('click', () => {
            clickTocontinue.style.display = "none";
            text2.style.display = "none";
            text3.style.display = "none";
            text4.style.opacity = "1";
            text4.style.animationName = "typing";

            setTimeout(() => {
                text5.style.opacity = "1";
                text5.style.animationName = "typing";
            }, 3000)

            setTimeout(() => {
                text6.style.opacity = "1";
                text6.style.animationName = "typing";
            }, 6000)

            setTimeout(() => {
                start.style.display = "inline-block";
                start.style.animationName = "zoom";
            }, 11000)

        })

    }, 6000)

})


w1container.addEventListener('mouseover', () => {
    infobox.style.opacity = "100%";
    infobox.style.transition = "opacity 1s";
})

w1container.addEventListener('mouseout', () => {
    infobox.style.opacity = "0%";
    infobox.style.transition = "opacity 1s";
})

start.addEventListener('click', () => {
    window.location.href = "/gamePage"
})