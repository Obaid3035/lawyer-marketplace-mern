import {Server, Socket} from 'socket.io'

class EventHandler {

    private io: Server

    constructor(io: Server) {
        this.io = io
        this.createConnection();
    }

    private createConnection() {
        this.io.on('connection', (socket: Socket) => {
            console.log("Socket connected successfully!")
            socket.on('setup', (roomId) => {
                console.log(`Successfully joined ${roomId}`)
                socket.join(roomId)
            })
            socket.on("leave-room", (conversationId: string) => {
                socket.leave(conversationId)
            })
            socket.on("join-room", (conversationId: string) => {
                socket.join(conversationId)
            })
            socket.on("typing", (room: number) => socket.in(room.toString()).emit("typing"))
            socket.on("stop typing", (room: number) => socket.in(room.toString()).emit("stop typing"))
            socket.on('send-message', (message, roomId, userId) => {
                console.log("Sending message: " + message.text + "to ID" + roomId)
                socket.to(roomId).emit('receive-message', message);
                socket.to(userId).emit('receive-notification', message)
            })
        })
    }
}

export default EventHandler;
