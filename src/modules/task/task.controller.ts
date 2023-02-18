import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import TaskService from './task.service';
import { TaskDto } from './task.dto';

class TaskController {
  public taskService = new TaskService();

  public createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const task = plainToInstance(TaskDto, req.body);
      const createdTask = await this.taskService.createTask(task);
      res.status(201).json({ data: createdTask, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let pageNo = Number(req.query.pageNo);
      if (isNaN(pageNo)) pageNo = 0;
      const getTasks = await this.taskService.getAllTasks(pageNo);
      res.status(200).json({ data: getTasks, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const taskId = Number(req.params.id);
      const getTask = await this.taskService.getTaskById(taskId);
      res.status(200).json({ data: getTask, message: 'getOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const taskId = Number(req.params.id);
      const task = plainToInstance(TaskDto, req.body);
      const updateTask = await this.taskService.updateTask(taskId, task);
      res.status(200).json({ data: updateTask, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const taskId = Number(req.params.id);
      const deleteTask = await this.taskService.deleteTask(taskId);
      res.status(200).json({ data: deleteTask, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
