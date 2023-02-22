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
      const dashboardData = plainToInstance(DashboardDto, req.body);
      const dashboard = {
        dashboard: {
          id: null,
          title: dashboardData.name,
          panels: [],
        },
        overwrite: true,
      };

      const headers = {
        Accept: 'application/json',
        Authorization: GrafanaToken,
        'Content-Type': 'application/json',
      };
      const createDashboardResponse = await axios.post(
        `${GrafanaURL}/api/dashboards/db`,
        dashboard,
        { headers }
      );
      req.body = { ...createDashboardResponse.data };
      console.log(createDashboardResponse.data);
      next();
      // res.json({ data: data, status: status });
    } catch (error) {
      next(error);
    }
  };

  public createPanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dashboardData = plainToInstance(DashboardDto, req.body);

      const dashboard = {
        dashboard: {
          id: null,
          title: dashboardData.name,
          panels: [],
        },
        overwrite: true,
      };

      const panel = {
        title: 'My Panel',
        type: 'timeseries',
        datasource: {
          type: 'datasource',
          uid: 'grafana',
        },
        targets: [
          {
            datasource: {
              type: 'datasource',
              uid: 'grafana',
            },
            queryType: 'randomWalk',
            refId: 'A',
          },
        ],
        gridPos: {
          x: 0,
          y: 0,
          w: 12,
          h: 6,
        },
      };

      const headers = {
        Accept: 'application/json',
        Authorization: GrafanaToken,
        'Content-Type': 'application/json',
      };
      const createDashboardResponse = await axios.post(
        `${GrafanaURL}/api/dashboards/db`,
        dashboard,
        { headers }
      );
      const dashboardId = createDashboardResponse.data.id;

      // @ts-ignore
      panel.id = dashboardId;
      // @ts-ignore
      dashboard.dashboard.panels.push(panel);
      const createPanelResponse = await axios.post(
        `${GrafanaURL}/api/dashboards/db`,
        dashboard,
        { headers }
      );
      req.body = { ...createPanelResponse.data };
      console.log(createPanelResponse.data);
      next();
      // res.json({ data: data, status: status });
    } catch (error) {
      next(error);
    }
  };
}

export default GrafanaController;
