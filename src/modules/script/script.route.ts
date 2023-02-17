import { Router } from 'express';
import ScriptController from './script.controller';

const scriptRouter = Router();
const path = '/script';
const scriptController = new ScriptController();

scriptRouter.get(`${path}`, scriptController.getAllScript);
scriptRouter.get(`${path}/:id(\\d+)`, scriptController.getScriptById);
scriptRouter.post(`${path}`, scriptController.createScript);
scriptRouter.put(`${path}/:id(\\d+)`, scriptController.updateScript);
scriptRouter.delete(`${path}/:id(\\d+)`, scriptController.deleteScript);

export default scriptRouter;
