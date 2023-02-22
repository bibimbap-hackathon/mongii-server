import { Server, Socket } from 'socket.io';
import * as http from 'http';
import { module, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function socketConfig(server: http.Server) {
  const io = new Server(server);

  const myNamespace = io.of('/socket');

  myNamespace.on('connection', (socket: Socket) => {
    console.log(`Edge connected from ${socket.handshake.address}`);

    socket.on('log', async (data, callback) => {
      console.log(data);
      const temp = data.split('');
      const result = await prisma.$transaction(async (tx) => {
        // const moduleError: module[] = await tx.module.findMany({
        //   where: { edge_id: Number(temp[0]) },
        // });
        // for (const module2 in moduleError){
        //   if (moduleError[module2].errorNo == 0){
        //
        //   }
        // }
        const update = await tx.module.updateMany({
          where: { edge_id: Number(temp[0]) },
          data: {
            errorNo: {
              increment: 1,
            },
          },
        });
        const select = await tx.module.findMany({
          where: {
            edge_id: Number(temp[0]),
            errorNo: {
              gte: 3,
            },
          },
        });
        // socket.emit('log', JSON.stringify(select));

        const update2 = await tx.module.updateMany({
          where: {
            edge_id: Number(temp[0]),
            errorNo: {
              gte: 3,
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
        callback({ ...select });
      });
    });

    socket.on('disconnect', () => {
      console.log(`Edge disconnected from ${socket.handshake.address}`);
    });
  });

  return io;
}
