let colorInput = document.getElementById('colorInput')
let count = 0

colorInput.addEventListener('change', () => {

    count += 1

    let newCircle = document.createElement('div')
    newCircle.id = `circle${count}`
    newCircle.className = 'circle'
    document.body.appendChild(newCircle)

    let circle = document.getElementById(`circle${count}`)
    circle.style.backgroundColor = colorInput.value
    circle.style.top = Math.random() * window.innerHeight + 'px'
    circle.style.left = Math.random() * window.innerWidth + 'px'
    oscillatorFreq = mapRange(parseInt(circle.style.left), 0, window.innerWidth, 100, 600);
    oscillatorVolume = mapRange(parseInt(circle.style.top), 0, window.innerHeight, 0.5, 6)
    circle.style.animationName = "resize"
    circle.style.animationDuration = Math.random() * 10 + 's'
    circle.style.animationIterationCount = "infinite"
    value = colorInput.value.match(/[A-Za-z0-9]{2}/g);
    value = value.map(function(v) { return parseInt(v, 16) }); //transform hex to rgb color
    largestRgb = getMax(value[0], value[1], value[2])


    let context = new AudioContext();

    let oscillator = context.createOscillator()

    if (largestRgb === value[0]) { //determine the type of oscillator according to the rgb value
        oscillator.type = 'sine'
    } else if (largestRgb === value[1]) {
        oscillator.type = 'square'
        circle.style.borderRadius = "0px"
    } else if (largestRgb === value[2]) {
        oscillator.type = 'sawtooth'
        circle.classList.add("sawtoothCircle");
        circle.style.borderRadius = '0px'
    }
    oscillator.frequency.value = 100;

    let gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination)

    oscillator.start(0);

    gain.gain.value = 1;


    dragElement(document.getElementById(`circle${count}`)); //make the shapes draggable
    //learn from https://www.w3schools.com/howto/howto_js_draggable.asp

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

            oscillatorFreq = mapRange(parseInt(elmnt.style.left), 0, window.innerWidth, 100, 600);
            oscillatorVolume = mapRange(parseInt(elmnt.style.top), 0, window.innerHeight, 0.5, 6)
            console.log(oscillatorFreq)

        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    setInterval(() => {
        // console.log(circle.offsetWidth)
        if (typeof oscillatorVolume != 'undefined') {
            gain.gain.value = mapRange(circle.offsetWidth, 0, 200, 0, oscillatorVolume);
        } else {
            gain.gain.value = mapRange(circle.offsetWidth, 0, 200, 0, 1);
        }
        if (typeof oscillatorFreq != 'undefined') {
            oscillator.frequency.value = oscillatorFreq;
        }
    }, 100);

})

function mapRange(value, a, b, c, d) { //this function simulate the map function in p5js
    value = (value - a) / (b - a);
    return c + value * (d - c);
}

function getMax(num1, num2, num3) { //A function to get the maximum value from three values
    //I used this to get the biggest value from the rgb, which determines the type of oscillator
    var max = num1;
    if (num1 > num2) {
        max = num1;
    } else {
        max = num2;
    }
    if (max > num3) {
        return max;
    } else {
        return num3;
    }
}