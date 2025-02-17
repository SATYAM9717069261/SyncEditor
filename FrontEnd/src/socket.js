import { io } from "socket.io-client"; // import is define in ES6 but we are not using ES6 in server.js [ NOTE: in new version node also support import ]
export const initSocket = async () => {
    const options = {
        'force new connection ': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket']
    }
    return io(process.env.REACT_APP_BACKEND_URL, options) // in node can't user .env directly => add package env
}
