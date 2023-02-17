import { edge, module, PrismaClient } from '@prisma/client';
import { ModuleDto } from './module.dto';

const prisma = new PrismaClient();
const countPerCount = 20;

class ModuleService {
  public createModule = async (module: ModuleDto): Promise<module> => {
    const result = await prisma.module.create({
      data: module,
    });
    prisma.$disconnect();
    return result;
  };

  public getAllModules = async (pageNo: number): Promise<module[]> => {
    const skipNo = pageNo * countPerCount;
    const result = prisma.module.findMany({
      skip: skipNo,
      take: countPerCount,
    });
    prisma.$disconnect();
    return result;
  };

  public getModuleById = async (moduleId: number): Promise<module> => {
    const result = prisma.module.findUniqueOrThrow({
      where: { module_id: moduleId },
    });
    prisma.$disconnect();
    return result;
  };

  public updateModule = async (
    moduleId: number,
    module: ModuleDto
  ): Promise<module> => {
    const result = prisma.module.update({
      where: { module_id: moduleId },
      data: module,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteModule = async (moduleId: number): Promise<module> => {
    const result = prisma.module.delete({
      where: { module_id: moduleId },
    });
    prisma.$disconnect();
    return result;
  };
}

export default ModuleService;
