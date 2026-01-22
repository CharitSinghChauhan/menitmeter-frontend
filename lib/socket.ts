"use client";

import { io, Socket } from "socket.io-client";

export interface ISocketResponse {
  success: boolean;
  message: string;
  payload: any;
}

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:8000";

let socket: Socket;

const getSocket = (): Socket => {
  // 1. Prevent connection on server-side
  if (typeof window === "undefined") {
    return io(URL, { autoConnect: false });
  }

  if (!socket) {
    // 2. In Development: usage globalThis to persist connection across HMR (Hot Module Reloads)
    if (process.env.NODE_ENV === "development") {
      if (!(globalThis as any).socket) {
        (globalThis as any).socket = io(URL, {
          transports: ["websocket"],
          autoConnect: true,
        });
      }
      socket = (globalThis as any).socket;
    } else {
      // 3. In Production: Standard singleton
      socket = io(URL, {
        transports: ["websocket"],
        autoConnect: true,
      });
    }
  }
  return socket;
};

export default getSocket;
