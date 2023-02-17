import { edge, PrismaClient } from '@prisma/client';
import { EdgeDto } from './edge.dto';

const prisma = new PrismaClient();
const countPerCount = 20;

class EdgeService {
  public getAllEdges = async (pageNo: number): Promise<edge[]> => {
    const skipNo = pageNo * countPerCount;
    const result = prisma.edge.findMany({
      skip: skipNo,
      take: countPerCount,
    });
    prisma.$disconnect();
    return result;
  };

  public getEdgeById = async (edgeId: number): Promise<edge> => {
    const result = prisma.edge.findUniqueOrThrow({
      where: { edge_id: edgeId },
    });
    prisma.$disconnect();
    return result;
  };

  public createEdge = async (edge: EdgeDto): Promise<edge> => {
    const result = await prisma.edge.create({
      data: edge,
    });
    prisma.$disconnect();
    return result;
  };

  public updateEdge = async (edgeId: number, edge: EdgeDto): Promise<edge> => {
    const result = await prisma.edge.update({
      where: {edge_id: edgeId},
      data: edge,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteEdge = async (edgeId: number): Promise<edge> => {
    const result = await prisma.edge.delete({
      where: {edge_id: edgeId},
    });
    prisma.$disconnect();
    return result;
  };

}

export default EdgeService;
