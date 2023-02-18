import { Router } from 'express';
import PanelController from './panel.controller';

const panelRouter = Router();
const path = '/panel';
const panelController = new PanelController();

panelRouter.get(`${path}`, panelController.getAllPanels);
panelRouter.get(`${path}/:id(\\d+)`, panelController.getPanelById);
panelRouter.post(`${path}`, panelController.createPanel);
panelRouter.put(`${path}/:id(\\d+)`, panelController.updatePanel);
panelRouter.delete(`${path}/:id(\\d+)`, panelController.deletePanel);

export default panelRouter;