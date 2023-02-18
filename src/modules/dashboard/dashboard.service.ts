import { dashboard, edge, PrismaClient } from '@prisma/client';
import { DashboardDto } from './dashboard.dto';
import { countPerPage } from '../../config/env';

const prisma = new PrismaClient();

class DashboardService {
  public createDashboard = async (
    dashboard: DashboardDto
  ): Promise<dashboard> => {
    const result = await prisma.dashboard.create({
      data: dashboard,
    });
    prisma.$disconnect();
    return result;
  };

  public getAllDashboards = async (pageNo: number): Promise<dashboard[]> => {
    const skipNo = pageNo * countPerPage;
    const result = prisma.dashboard.findMany({
      skip: skipNo,
      take: countPerPage,
    });
    prisma.$disconnect();
    return result;
  };

  public getDashboardById = async (dashboardId: number): Promise<dashboard> => {
    const result = prisma.dashboard.findUniqueOrThrow({
      where: { dashboard_id: dashboardId },
    });
    prisma.$disconnect();
    return result;
  };

  public updateDashboard = async (
    dashboardId: number,
    dashboard: DashboardDto
  ): Promise<dashboard> => {
    const result = await prisma.dashboard.update({
      where: { dashboard_id: dashboardId },
      data: dashboard,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteDashboard = async (dashboardId: number): Promise<dashboard> => {
    const result = await prisma.dashboard.delete({
      where: { dashboard_id: dashboardId },
    });
    prisma.$disconnect();
    return result;
  };
}

export default DashboardService;
