import { socketAuth } from '#root/middleware/auth'

const setWebSocket = io => {
    // middleware
    io.use(socketAuth)

    io.on('connection', socket => {
        console.colorLog('WebSocket', `${socket.user.name.green} connected`)
        socket.join(socket.user._id.toString())
    })

    io.event = {
        REFRESH_ROOM_INFO: 'REFRESH_ROOM_INFO',
        NEW_ROOM_MESSAGE: 'NEW_ROOM_MESSAGE',
    }
}

export default setWebSocket
