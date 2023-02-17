import { node, PrismaClient } from '@prisma/client';
import { NodeDto } from './node.dto';

const prisma = new PrismaClient();
const countPerCount = 20;

class NodeService {
  public getAllNodes = async (pageNo: number): Promise<node[]> => {
    const skipNo = pageNo * countPerCount;
    const result = await prisma.node.findMany({
      skip: skipNo,
      take: countPerCount,
    });
    prisma.$disconnect();
    return result;
  };

  public getNodeById = async (nodeId: number): Promise<node> => {
    const result = await prisma.node.findUniqueOrThrow({
      where: { node_id: nodeId },
    });
    prisma.$disconnect();
    return result;
  };

  public createNode = async (node: NodeDto): Promise<node> => {
    const result = await prisma.node.create({
      data: node,
    });
    prisma.$disconnect();
    return result;
  };

  public updateNode = async (nodeId: number, node: NodeDto): Promise<node> => {
    const result = await prisma.node.update({
      where: { node_id: nodeId },
      data: node,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteNode = async (nodeId: number): Promise<node> => {
    const result = await prisma.node.delete({
      where: { node_id: nodeId },
    });
    prisma.$disconnect();
    return result;
  };
}

export default NodeService;
