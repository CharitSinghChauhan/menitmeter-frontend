"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: null | Socket;
  connected: boolean;
}

export interface ISocketResponse<T> {
  message: string;
  success: boolean;
  payload: T;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  connected: false,
});

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const s = io(backendUrl, {
        autoConnect: false,
      });

      setSocket(s);

      s.on("connect", () => {
        console.log("inside connect: true");
        setConnected(true);
      });
      s.on("disconnect", () => {
        console.log("inside disconnect");
        setConnected(false);
      });

      return () => s.disconnect();
    })();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};
