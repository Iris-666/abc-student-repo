var express = require('express')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('new connection', socket.id)
})

http.listen(3001, () => {
    console.log('listening on *:3001');
});