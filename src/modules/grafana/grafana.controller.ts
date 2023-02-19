import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { GrafanaToken, GrafanaURL } from '../../config/env';
import { plainToInstance } from 'class-transformer';
import { DashboardDto } from '../dashboard/dashboard.dto';

class GrafanaController {
  public createDashBoardAndPanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dashboard = plainToInstance(DashboardDto, req.body);
      const { data, status } = await axios.post(
        GrafanaURL + '/api/dashboards/db',
        {
          dashboard: {
            id: null,
            uid: null,
            title: dashboard.name,
            tags: ['templated'],
            timezone: 'browser',
            schemaVersion: 16,
            version: 0,
            refresh: '25s',
          },
          message: 'Made changes to xyz',
          overwrite: false,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: GrafanaToken,
            'Content-Type': 'application/json',
          },
        }
      );
      req.body = { ...data};
      console.log(data);
      next();
      // res.json({ data: data, status: status });
    } catch (error) {
      next(error);
    }
  };
}

export default GrafanaController;
