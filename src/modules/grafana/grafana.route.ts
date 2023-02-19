import { Router } from 'express';
import GrafanaController from './grafana.controller';
import DashboardController from '../dashboard/dashboard.controller';

const grafanaRouter = Router();
const path = '/grafana';
const grafanaController = new GrafanaController();
const dashboardController = new DashboardController();

grafanaRouter.post(`${path}`, grafanaController.createDashBoardAndPanel, dashboardController.createDashboard);

export default grafanaRouter;
