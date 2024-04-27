import { io, Socket } from 'socket.io-client';

export const socketFactory = (namespace: string) => {
  let socket: Socket;

  return async () => {
    if (!socket) {
      socket = io(`http://localhost:3000/${namespace}`, {
        transports: ['websocket'],
        withCredentials: true,
      });
    } else if (!socket.disconnected) {
      socket.connect();
    }

    return socket;
  };
};
