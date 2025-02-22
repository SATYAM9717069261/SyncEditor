const express = require('express');
const app = express();
const http = require('http');
const { getActionByID } = require("./src/Components/enum.js")

const server = http.createServer(app);
const { Server } = require("socket.io")

const io = new Server(server);
const PORT = process.env.PORT || 5000;

const userMapping = {} // use Redis or sql 

server.listen(PORT, () => {
    console.log("USE PORT:", PORT)
})

function getAllConnectedClients(roomID) {
    return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map((socketId) => { // io.sockets.adapter.rooms -> return Map and Convert it to array
        return {
            socketId,
            userName: userMapping[socketId]
        }
    })

}
io.on('connection', (socket) => {
    socket.on(getActionByID('JOIN'), ({ roomID, userName }) => {
        userMapping[socket.id] = userName;
        socket.join(roomID); // room Name is Room ID, if room Already exist , simple JOIN , if room is not exist create ROOM
        /** Notify if New User join **/
        const roomClients = getAllConnectedClients(roomID);
        roomClients.forEach(({ socketId, userName }) => {
            io.to(socketId).emit(getActionByID('JOINED'), {
                roomClients,
                userName,
                socketId: socket.id
            })
        })
    })
    console.log("Socket => ", socket.id)
})
