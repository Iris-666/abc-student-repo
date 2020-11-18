let sendGuess = document.getElementById('sendGuess');
let guessAnimal = document.getElementById('guessAnimal');
let eyeImage = document.getElementById('eyeImage')

window.onload = function() {
    fetch('/getImage')
        .then((data) => { return data.json() })
        .then(data => {
            console.log(data.animalNow)
            eyeImage.src = `/images/${data.animalNow}-eye.jpg`
        })
}

sendGuess.addEventListener('click', () => {
    let guess = guessAnimal.value;
    console.log(guess);
    window.location.href = "/guess?word=" + guess
})