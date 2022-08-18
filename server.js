const express = require('express');
const path = require('path');

const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.use('/', (req, res) => {
    res.render('index.html');
});

let message = [];



io.on('connection', (socket) => {

    socket.emit('previusMessages', message);
    socket.on('sendMessage', (data) => {
        message.push(data),
            socket.broadcast.emit('receivedMessage', data)
    })
});



server.listen(3000, () => {
    console.log('listening on *:3000');
});