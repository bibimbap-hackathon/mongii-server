import { script, PrismaClient, node } from '@prisma/client';
import { ScriptDto } from './script.dto';
import { countPerPage } from '../../config/env';

const prisma = new PrismaClient();

class ScriptService {
  public createScript = async (script: ScriptDto): Promise<script> => {
    const result = await prisma.script.create({
      data: script,
    });
    prisma.$disconnect();
    return result;
  };

  public getAllScripts = async (pageNo: number): Promise<script[]> => {
    const skipNo = pageNo * countPerPage;
    const result = await prisma.script.findMany({
      skip: skipNo,
      take: countPerPage,
    });
    prisma.$disconnect();
    return result;
  };

  public getScriptById = async (scriptId: number): Promise<script> => {
    const result = await prisma.script.findUniqueOrThrow({
      where: { script_id: scriptId },
    });
    prisma.$disconnect();
    return result;
  };

  public updateScript = async (
    scriptId: number,
    script: ScriptDto
  ): Promise<script> => {
    const result = await prisma.script.update({
      where: { script_id: scriptId },
      data: script,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteScript = async (
    scriptId: number,
  ): Promise<script> => {
    const result = await prisma.script.delete({
      where: { script_id: scriptId },
    });
    prisma.$disconnect();
    return result;
  };
}

export default ScriptService;
