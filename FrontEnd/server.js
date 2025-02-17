const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io")

const io = new Server(server);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log("USE PORT:", PORT)
})

io.on('connection', (socket) => {
    console.log("Socket => ", socket.id)
})
