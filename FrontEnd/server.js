const express = require('express');
const app = express();
const http = require('http');
const { getActionByID } = require("./src/Components/enum.js")

const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');

const PORT = process.env.PORT || 5000;
const io = new Server(server);


const userMapping = {} // use Redis or sql 

server.listen(PORT, () => {
    console.log("USE PORT:", PORT)
})

app.use(express.static('build'));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
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

    socket.on(getActionByID('CODE_CHANGE'), ({ roomID, userDetail, value }) => {
        const roomClients = getAllConnectedClients(roomID);
        roomClients.forEach(({ socketId, userName }) => {
            if (userDetail.id != socketId) {
                io.to(socketId).emit(getActionByID('CODE_CHANGE'), { value })
            }
        })
    })

    socket.on('disconnecting', () => {
        // if user go to another tab [not in Our App]
        const rooms = [...socket.rooms]
        rooms.forEach((roomID) => {
            socket.in(roomID).emit(getActionByID("DISCONNECTED"), {
                socketId: socket.id,
                userName: userMapping[socket.id]
            })
        })
        delete userMapping[socket.id]
        socket.leave();
    })
})


