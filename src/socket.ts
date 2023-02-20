import { Server, Socket } from 'socket.io';
import * as http from 'http';

export default function socketConfig(server: http.Server) {
  const io = new Server(server);

  const myNamespace = io.of('/socket');

  myNamespace.on('connection', (socket: Socket) => {
    console.log('Edge connected');

    socket.on('log', (data) => {
      console.log(data);
    });

    socket.on('disconnect', () => {
      console.log('Edge disconnected');
    });
  });

  return io;
}
