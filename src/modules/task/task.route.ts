import { Router } from 'express';
import TaskController from './task.controller';

const taskRouter = Router();
const path = '/task';
const taskController = new TaskController();

taskRouter.get(`${path}`, taskController.getAllTasks);
taskRouter.get(`${path}/:id(\\d+)`, taskController.getTaskById);
taskRouter.post(`${path}`, taskController.createTask);
taskRouter.put(`${path}/:id(\\d+)`, taskController.updateTask);
taskRouter.delete(`${path}/:id(\\d+)`, taskController.deleteTask);

export default taskRouter;
