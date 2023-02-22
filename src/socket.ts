import { Server, Socket } from 'socket.io';
import * as http from 'http';
import { module, PrismaClient } from '@prisma/client';
import axios from 'axios';
import { RemoteURL } from './config/env';
import TaskService from './modules/task/task.service';

const prisma = new PrismaClient();

export default function socketConfig(server: http.Server) {
  const io = new Server(server);

  const myNamespace = io.of('/socket');
  const taskService = new TaskService();

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
      console.log(counts);
      for (let moduleIp in counts) {
        if (counts[moduleIp] > 0) {
          counts[moduleIp] = 0;
        } else {
          try {
            const update = await prisma.module.updateMany({
              where: { ip: moduleIp },
              data: {
                errorNo: {
                  increment: 1,
                },
              },
            });

            const setState = await prisma.module.updateMany({
              where: {
                ip: moduleIp,
                errorNo: {
                  gte: 5,
                },
              },
              data: {
                // @ts-ignore
                state: '1',
              },
            });
            const data:any = await prisma.module.findFirstOrThrow({
              // @ts-ignore
              where: { ip: moduleIp, state: '1' },
              select: {
                name: true,
                edge: {
                  select: {
                    ip: true,
                    node: {
                      select: {
                        ip: true,
                      },
                    },
                  },
                },
              },
            });
            const body = {
              edgeIp: data.edge.ip,
              fogIp: data.edge.node.ip,
              moduleName: data.name,
            };
            const result = await axios.post(`${RemoteURL}/e2f/`, body);
            const setState2 = await prisma.module.updateMany({
              where: {
                ip: moduleIp,
                errorNo: {
                  gte: 5,
                },
              },
              data: {
                errorNo: 0,
                // @ts-ignore
                state: '0',
              },
            });
            console.log(body);
          }
          catch (e){

          }
        }
      }
    }, 2000);

    socket.on('disconnect', () => {
      console.log(`Edge disconnected from ${socket.handshake.address}`);
    });
  });

  return io;
}
