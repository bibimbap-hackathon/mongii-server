import { Server, Socket } from 'socket.io';
import * as http from 'http';
import { module, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default function socketConfig(server: http.Server) {
  const io = new Server(server);

  const myNamespace = io.of('/socket');

  interface count {
    [module: string]: number;
  }

  const counts: count = {};

  myNamespace.on('connection', (socket: Socket) => {
    console.log(`Edge connected from ${socket.handshake.address}`);

    socket.on('log', async (data) => {
      const temp = data.split(' ');
      if (!counts[temp[0]]) {
        counts[temp[0]] = 1;
      } else {
        counts[temp[0]]++;
      }
    });

    setInterval(async () => {
      // console.log(counts);
      for (let module in counts) {
        if (counts[module] > 0) {
          counts[module] = 0
        } else {
          const update = await prisma.module.updateMany({
            where: { ip: module },
            data: {
              errorNo: {
                increment: 1,
              },
            },
          });

          const setState = await prisma.module.updateMany({
            where: {
              ip: module,
              errorNo: {
                gte: 5,
              },
            },
            data: {
              errorNo: {
                decrement: 3,
              },
              // @ts-ignore
              state: '1',
            },
          });
        }
      }
    }, 2000);

    socket.on('disconnect', () => {
      console.log(`Edge disconnected from ${socket.handshake.address}`);
    });
  });

  return io;
}
