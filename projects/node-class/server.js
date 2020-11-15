const express = require('express')
const app = express()
const port = 3000

app.use(express.static("public"))

//define routers behavior, what to return on which request
app.get('/', (req, res) => {
    console.log(req.query)
        // res.send('Hi World!')
    res.sendFile(__dirname + "/iris/index.html")
})

//"/iris" route
app.get('/iris', (req, res) => {
    res.send('Hi Iris!')

})

//at last we start the server, listening on a specific port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})