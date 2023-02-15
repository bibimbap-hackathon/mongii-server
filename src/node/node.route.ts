import NodeController from './node.controller';
import { Router } from 'express';

const nodeRouter = Router();
const path = '/node';
const nodeController = new NodeController();

nodeRouter.get(`${path}`, nodeController.getAllNodes);
nodeRouter.get(`${path}/:id(\\d+)`, nodeController.getNodeById);
nodeRouter.post(`${path}`, nodeController.createNode);
nodeRouter.put(`${path}/:id(\\d+)`, nodeController.updateNode);
nodeRouter.delete(`${path}/:id(\\d+)`, nodeController.deleteNode);

export default nodeRouter;
