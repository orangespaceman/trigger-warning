const express = require('express');

const app = express();

const port = process.env.PORT || process.env['app_port'] || 7005;

const server = app.listen(port);

const io = require('socket.io')(server);

app.use(express.static('static'));

var host = io.of('/host');

var client = io.of('/client');
client.on('connection', (socket) => {
    socket.on('trigger', (data) => {
        host.emit('trigger', data);
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/client.html');
});

app.get('/host', (req, res) => {
    res.sendFile(__dirname + '/views/host.html');
});
