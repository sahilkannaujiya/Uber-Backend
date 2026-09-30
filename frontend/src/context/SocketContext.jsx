import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL, {
  autoConnect: false,
});

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

 useEffect(() => {
  const handleConnect = () => {
    setIsConnected(true);
    console.log("Socket Connected:", socket.id);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    console.log("Socket Disconnected");
  };

  socket.connect();

  socket.on("connect", handleConnect);
  socket.on("disconnect", handleDisconnect);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("disconnect", handleDisconnect);
    socket.disconnect();
  };
}, []);

  const sendMessage = (eventName, data) => {
    if (socket.connected) {
      socket.emit(eventName, data);
    } else {
      console.log("Socket is not connected.");
    }
  };

  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        sendMessage,
        receiveMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);