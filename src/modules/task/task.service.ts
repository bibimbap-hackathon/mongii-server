import { task, PrismaClient } from '@prisma/client';
import { CountPerPage } from '../../config/env';
import { TaskDto } from './task.dto';

const prisma = new PrismaClient();

class TaskService {
  public createTask = async (task: TaskDto): Promise<task> => {
    const result = await prisma.task.create({
      data: task,
    });
    prisma.$disconnect();
    return result;
  };

  public getAllTasks = async (pageNo: number): Promise<task[]> => {
    const skipNo = pageNo * Number(CountPerPage);
    const result = prisma.task.findMany({
      skip: skipNo,
      take: CountPerPage,
    });
    prisma.$disconnect();
    return result;
  };

  public getTaskById = async (TaskId: number): Promise<task> => {
    const result = prisma.task.findUniqueOrThrow({
      where: { task_id: TaskId },
    });
    prisma.$disconnect();
    return result;
  };

  public updateTask = async (taskId: number, task: TaskDto): Promise<task> => {
    const result = prisma.task.update({
      where: { task_id: taskId },
      data: task,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteTask = async (taskId: number): Promise<task> => {
    const result = prisma.task.delete({
      where: { task_id: taskId },
    });
    prisma.$disconnect();
    return result;
  };

  public getEdgeAndFogIp = async (moduleId: number): Promise<any> => {
    const result = prisma.module.findFirstOrThrow({
      where: { module_id: moduleId },
      select: {
        name: true,
        edge: {
          select: {
            ip: true,
            node:{
              select: {
                ip:true
              }
            }
          },
        },
      },
    });
    prisma.$disconnect();
    return result;
  };
}

export default TaskService;
