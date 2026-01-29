"use client";

import { io, Socket } from "socket.io-client";

export interface ISocketResponse<T = unknown> {
  success: boolean;
  message: string;
  payload: T;
}

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:8000";

let socket: Socket;

type GlobalWithSocket = typeof globalThis & {
  socket: Socket;
};

const getSocket = (): Socket => {
  // 1. Prevent connection on server-side
  if (typeof window === "undefined") {
    return io(URL, { autoConnect: false });
  }

  if (!socket) {
    // 2. In Development: usage globalThis to persist connection across HMR (Hot Module Reloads)
    // TODO : fix this
    if (process.env.NODE_ENV === "development") {
      if (!(globalThis as GlobalWithSocket).socket) {
        (globalThis as GlobalWithSocket).socket = io(URL, {
          transports: ["websocket"],
          autoConnect: true,
        });
      }
      socket = (globalThis as GlobalWithSocket).socket;
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
