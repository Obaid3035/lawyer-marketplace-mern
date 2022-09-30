import io, { Socket } from "socket.io-client";
import { IMessage } from "../Container/Pages/Chat/ChatBox/ChatBox";

class SocketIO {
  private server: string = "https://alzheimer-server.herokuapp.com";
  public socket: Socket = io(this.server);

  connectWithSocketIoServer() {
    this.socket.on("connection", () => {
      console.log("successfully connected with socket io server");
      console.log(this.socket?.id);
    });
  }

  onReceiveMessage(cb: any) {
    this.socket.on("receive-message", (message) => {
      console.log('message received')
      cb(message);
    });
  }

  onReceiveNotification(cb: any) {
    this.socket.on("receive-notification", (message) => {
      console.log('notification received')
      cb(message);
    });
  }



  onReceiveStartTypingMessage(cb: any) {
    this.socket.on("typing", () => {
      cb();
    });
  }

  onReceiveStopTypingMessage(cb: any) {
    this.socket.on("stop typing", () => {
      cb();
    });
  }

  onSendStartTypingMessage(roomId: string) {
    this.socket.emit("typing", roomId);
  }

  onSendStopTypingMessage(roomId: string) {
    this.socket.emit("stop typing", roomId);
  }

  setup(roomId: string) {
    console.log(`joining room ${roomId}`);
    this.socket.emit("setup", roomId);
  }

  joinRoom(roomId: string) {
    console.log(`joining room ${roomId}`);
    this.socket.emit("join-room", roomId);
  }

  leaveRoom(roomId: string) {
    console.log(`leaving room ${roomId}`);
    this.socket.emit("leave-room", roomId);
  }

  sendMessage(message: IMessage, roomId: string, userId: string) {
    console.log("send message", message)
    this.socket.emit("send-message", message, roomId, userId);
  }
}

export default SocketIO;
