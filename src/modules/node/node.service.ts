import { node, PrismaClient } from '@prisma/client';
import { NodeDto } from './node.dto';
import { countPerPage } from '../../config/env'

const prisma = new PrismaClient();

class NodeService {
  public getAllNodes = async (pageNo: number): Promise<node[]> => {
    const skipNo = pageNo * countPerPage;
    const result = await prisma.node.findMany({
      skip: skipNo,
      take: countPerPage,
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
