import { Router } from 'express';
import ModuleController from './module.controller';

const moduleRouter = Router();
const path = '/module';
const moduleController = new ModuleController();

moduleRouter.get(`${path}`, moduleController.getAllModules);
moduleRouter.get(`${path}/:id(\\d+)`, moduleController.getModuleById);
moduleRouter.post(`${path}`, moduleController.createModule);
moduleRouter.put(`${path}/:id(\\d+)`, moduleController.updateModule);
moduleRouter.delete(`${path}/:id(\\d+)`, moduleController.deleteModule);

export default moduleRouter;
