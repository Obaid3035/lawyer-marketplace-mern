import { useContext } from "react";
import SocketIO from "../util/wss";
import SocketContext from "../context/SocketProvider";
type useSocketType = {
  socket: SocketIO | null;
  setSocket: (socket: SocketIO) => void;
};

const useSocket = (): useSocketType => {
  return useContext(SocketContext) as useSocketType;
};

export default useSocket;
