const express = require('express')
const app = express()
const port = 3002

let animals = ["dog", "cat", "lion"]
let animal = "dog";
let wrongAnswersDog = [];
let wrongAnswersCat = [];
let wrongAnswersLion = [];
let rightCount = 0;

app.use(express.static('public'));

app.get('/guess', (req, res) => {
    let query = req.query;
    let guess = query.word;
    // console.log(rightCount)
    if (guess == animal) {
        if (rightCount >= 2) {
            rightCount = 0
        } else {
            rightCount += 1
        }
        res.redirect(`/${animal}`)
        animal = animals[rightCount];
    } else {
        // wrongAnswers.push(guess)
        if (rightCount == 0) {
            wrongAnswersDog.push(guess)
        }
        if (rightCount == 1) {
            wrongAnswersCat.push(guess)
        }
        if (rightCount == 2) {
            wrongAnswersLion.push(guess)
        }

        // res.redirect(`/wrong/${rightCount}-wrong`)
        res.redirect(`/wrong`)

    }
})

app.get('/getWrongAnswers', (req, res) => {
    res.json({ wrongAnswersDog: wrongAnswersDog, wrongAnswersCat: wrongAnswersCat, wrongAnswersLion: wrongAnswersLion, sender: "the server gods" })
})


app.get('/getImage', (req, res) => {
    res.json({ animalNow: animals[rightCount], sender: "the server gods" })
})

app.get('/getImageAndWrongAnswers', (req, res) => {
    res.json({ animalNow: animals[rightCount], wrongAnswersDog: wrongAnswersDog, wrongAnswersCat: wrongAnswersCat, wrongAnswersLion: wrongAnswersLion, sender: "the server gods" })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})