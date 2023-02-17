import { Router } from 'express';
import EdgeController from './edge.controller';

const edgeRouter = Router();
const path = '/edge';
const edgeController = new EdgeController();

edgeRouter.get(`${path}`, edgeController.getAllEdges);
edgeRouter.get(`${path}/:id(\\d+)`, edgeController.getEdgeById);
edgeRouter.post(`${path}`, edgeController.createEdge);
edgeRouter.put(`${path}/:id(\\d+)`, edgeController.updateEdge);
edgeRouter.delete(`${path}/:id(\\d+)`, edgeController.deleteEdge);

export default edgeRouter;
