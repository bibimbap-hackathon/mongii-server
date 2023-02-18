import { panel, PrismaClient } from '@prisma/client';
import { countPerPage } from '../../config/env';
import { PanelDto } from './panel.dto';

const prisma = new PrismaClient();

class PanelService {
  public createPanel = async (panel: PanelDto): Promise<panel> => {
    const result = await prisma.panel.create({
      data: panel,
    });
    prisma.$disconnect();
    return result;
  };

  public getAllPanels = async (pageNo: number): Promise<panel[]> => {
    const skipNo = pageNo * Number(countPerPage);
    const result = prisma.panel.findMany({
      skip: skipNo,
      take: countPerPage,
    });
    prisma.$disconnect();
    return result;
  };

  public getPanelById = async (panelId: number): Promise<panel> => {
    const result = prisma.panel.findUniqueOrThrow({
      where: { panel_id: panelId },
    });
    prisma.$disconnect();
    return result;
  };

  public updatePanel = async (
    panelId: number,
    panel: PanelDto
  ): Promise<panel> => {
    const result = prisma.panel.update({
      where: { panel_id: panelId },
      data: panel,
    });
    prisma.$disconnect();
    return result;
  };

  public deletePanel = async (panelId: number): Promise<panel> => {
    const result = prisma.panel.delete({
      where: { panel_id: panelId },
    });
    prisma.$disconnect();
    return result;
  };
}

export default PanelService;
