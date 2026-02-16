import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (token: string) => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  socket = io(import.meta.env.VITE_SERVER_API_URL, {
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('socket-connect', socket?.id);
  });

  socket.on('connect_error', (err) => {
    console.log('socket-connect_error', err.message);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket?.disconnect();
    socket = null;
  }
};
