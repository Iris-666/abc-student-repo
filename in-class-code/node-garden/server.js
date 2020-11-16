const express = require('express')
const app = express()
const port = 3000
const secret = "paperclip"

let gifts = [];

app.use(express.static('public'));

app.get('/secret', (req, res) => {
    let query = req.query;
    let guess = query.word;
    console.log(guess)
    if (guess == secret) {
        console.log("let them into the garden")
            // res.sendFile(__dirname + "/public/garden/index.html")
        res.redirect("/garden")
    } else {
        console.log("something is fishy")
            // res.sendFile(__dirname + "/public/fishy/index.html")
        res.redirect("/fishy")
    }
})

app.get('/gift', (req, res) => {
    let query = req.query;
    let gift = query.gift;
    gifts.push(gift);
    console.log('received ' + gifts)
})

app.get('/getGifts', (req, res) => {
    res.json({ content: gifts, sender: "the garden gods" })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})