import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import TaskService from './task.service';
import { TaskDto } from './task.dto';
import axios from 'axios';

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

  public edgeToFog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const moduleId = Number(req.params.id);
      const data = await this.taskService.getEdgeAndFogIp(moduleId);
      // const result = await axios.post(
      //
      // )
      res.status(200).json({
        data: {
          edgeIp: data.edge.ip,
          fogIp: data.edge.node.ip,
          moduleName: data.name,
        },
        message: 'EdgeToFog',
      });
    } catch (error) {
      next(error);
    }
  };

  public FogToEdge = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const moduleId = Number(req.params.id);
      const data = await this.taskService.getEdgeAndFogIp(moduleId);
      res.status(200).json({
        data: {
          edgeIp: data.edge.ip,
          fogIp: data.edge.node.ip,
          moduleName: data.name,
        },
        message: 'FogToEdge',
      });
    } catch (error) {
      next(error);
    }
  };

  public ecoOn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const moduleId = Number(req.params.id);
      const data = await this.taskService.getEdgeAndFogIp(moduleId);
      res.status(200).json({
        data: {
          edgeIp: data.edge.ip,
          fogIp: data.edge.node.ip,
        },
        message: 'ecoOn',
      });
    } catch (error) {
      next(error);
    }
  };

  public ecoOff = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const moduleId = Number(req.params.id);
      const data = await this.taskService.getEdgeAndFogIp(moduleId);
      res.status(200).json({
        data: {
          edgeIp: data.edge.ip,
          fogIp: data.edge.node.ip,
        },
        message: 'ecoOff',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
