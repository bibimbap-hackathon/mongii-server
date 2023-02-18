import DashboardService from './dashboard.service';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { DashboardDto } from './dashboard.dto';

class DashboardController {
  public dashboardService = new DashboardService();

  public createDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dashboard = plainToInstance(DashboardDto, req.body);
      const createdDashboard = await this.dashboardService.createDashboard(
        dashboard
      );
      res.status(201).json({ data: createdDashboard, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllDashboards = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let pageNo = Number(req.query.pageNo);
      if (isNaN(pageNo)) pageNo = 0;
      const getDashboards = await this.dashboardService.getAllDashboards(
        pageNo
      );
      res.status(200).json({ data: getDashboards, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDashboardById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dashboardId = Number(req.params.id);
      const getDashboard = await this.dashboardService.getDashboardById(
        dashboardId
      );
      res.status(200).json({ data: getDashboard, message: 'getOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dashboardId = Number(req.params.id);
      const dashboard = plainToInstance(DashboardDto, req.body);
      const updateDashboard = await this.dashboardService.updateDashboard(dashboardId, dashboard);
      res.status(200).json({ data: updateDashboard, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dashboardId = Number(req.params.id);
      const deleteDashboard = await this.dashboardService.deleteDashboard(dashboardId);
      res.status(200).json({ data: deleteDashboard, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DashboardController;
