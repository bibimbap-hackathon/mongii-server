import { Router } from 'express';
import TaskController from './task.controller';

const taskRouter = Router();
const path = '/task';
const taskController = new TaskController();

taskRouter.get(`${path}`, taskController.getAllTasks);
taskRouter.get(`${path}/:id(\\d+)`, taskController.getTaskById);
taskRouter.get(`${path}/e2f/:id(\\d+)`, taskController.edgeToFog);
taskRouter.get(`${path}/f2e/:id(\\d+)`, taskController.FogToEdge);
taskRouter.get(`${path}/ecoOn/:id(\\d+)`, taskController.ecoOn);
taskRouter.get(`${path}/ecoOff/:id(\\d+)`, taskController.ecoOff);
taskRouter.post(`${path}`, taskController.createTask);
taskRouter.patch(`${path}/:id(\\d+)`, taskController.updateTask);
taskRouter.delete(`${path}/:id(\\d+)`, taskController.deleteTask);

export default taskRouter;
