let sendGuess = document.getElementById('sendGuess');
let guessAnimal = document.getElementById('guessAnimal');
let container = document.getElementById('container')
let eyeImage = document.getElementById('eyeImage')

sendGuess.addEventListener('click', () => {
    let guess = guessAnimal.value;
    console.log(guess);
    window.location.href = "/guess?word=" + guess;
})

// setInterval(() => {
//     fetch("/getWrongAnswers")
//         .then((data) => { return data.json() })
//         .then(data => {
//             console.log('decoded: ', data.wrongAnswers);
//             let answers = data.wrongAnswers;
//             container.innerHTML = "";
//             for (let i = 0; i < answers.length; i++) {
//                 let answer = answers[i];
//                 let p = document.createElement('p');
//                 p.innerHTML = answer;
//                 p.style.position = 'absolute';
//                 p.style.left = Math.random() * window.innerWidth + 'px'
//                 p.style.top = Math.random() * window.innerHeight + 'px'
//                 container.appendChild(p)
//             }
//         })
// }, 1000);

window.onload = function() {
    // fetch("/getImage")
    //     .then((data) => { return data.json() })
    //     .then(data => {
    //         eyeImage.src = `/images/${data.animalNow}-eye.jpg`
    //     })

    fetch("/getImageAndWrongAnswers")
        .then((data) => { return data.json() })
        .then(data => {
            console.log('decoded: ', data);
            eyeImage.src = `/images/${data.animalNow}-eye.jpg`
            if (data.animalNow == "dog") {
                let answers = data.wrongAnswersDog
                container.innerHTML = "";
                for (let i = 0; i < answers.length; i++) {
                    let answer = answers[i];
                    let p = document.createElement('p');
                    p.innerHTML = answer;
                    p.style.position = 'absolute';
                    // p.style.left = Math.random() * window.innerWidth + 'px'
                    p.style.right = "-100px"
                    p.style.top = Math.random() * window.innerHeight + 'px'
                    p.style.animationName = "move"
                    p.style.animationIterationCount = "1"
                    p.style.animationDuration = Math.random() * 6 + 3 + 's'
                    p.style.animationDelay = Math.random() * 2 + 's'
                    p.style.animationTimingFunction = 'linear'
                    container.appendChild(p)
                }
            }
            if (data.animalNow == "cat") {
                let answers = data.wrongAnswersCat
                container.innerHTML = "";
                for (let i = 0; i < answers.length; i++) {
                    let answer = answers[i];
                    let p = document.createElement('p');
                    p.innerHTML = answer;
                    p.style.position = 'absolute';
                    p.style.right = "-100px"
                    p.style.top = Math.random() * window.innerHeight + 'px'
                    p.style.animationName = "move"
                    p.style.animationIterationCount = "1"
                    p.style.animationDuration = Math.random() * 6 + 3 + 's'
                    p.style.animationDelay = Math.random() * 2 + 's'
                    p.style.animationTimingFunction = 'linear'
                    container.appendChild(p)
                }
            }
            if (data.animalNow == "lion") {
                let answers = data.wrongAnswersLion
                container.innerHTML = "";
                for (let i = 0; i < answers.length; i++) {
                    let answer = answers[i];
                    let p = document.createElement('p');
                    p.innerHTML = answer;
                    p.style.position = 'absolute';
                    p.style.right = "-100px"
                    p.style.top = Math.random() * window.innerHeight + 'px'
                    p.style.animationName = "move"
                    p.style.animationIterationCount = "1"
                    p.style.animationDuration = Math.random() * 6 + 3 + 's'
                    p.style.animationDelay = Math.random() * 2 + 's'
                    p.style.animationTimingFunction = 'linear'
                    container.appendChild(p)
                }
            }


            // let answers = data.wrongAnswers;
            // container.innerHTML = "";
            // for (let i = 0; i < answers.length; i++) {
            //     let answer = answers[i];
            //     let p = document.createElement('p');
            //     p.innerHTML = answer;
            //     p.style.position = 'absolute';
            //     p.style.left = Math.random() * window.innerWidth + 'px'
            //     p.style.top = Math.random() * window.innerHeight + 'px'
            //     container.appendChild(p)
            // }
        })
}