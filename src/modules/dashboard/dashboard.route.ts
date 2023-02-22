import { Router } from 'express';
import DashboardController from './dashboard.controller';

const dashboardRouter = Router();
const path = '/dashboard';
const dashboardController = new DashboardController();

dashboardRouter.get(`${path}`, dashboardController.getAllDashboards);
dashboardRouter.get(`${path}/:id(\\d+)`, dashboardController.getDashboardById);
dashboardRouter.post(`${path}`, dashboardController.createDashboard);
dashboardRouter.patch(`${path}/:id(\\d+)`, dashboardController.updateDashboard);
dashboardRouter.delete(`${path}/:id(\\d+)`, dashboardController.deleteDashboard);

export default dashboardRouter;