import { edge, PrismaClient } from '@prisma/client';
import { EdgeDto } from './edge.dto';
import { countPerPage } from '../../config/env';

const prisma = new PrismaClient();

class EdgeService {
  public getAllEdges = async (pageNo: number): Promise<edge[]> => {
    const skipNo = pageNo * countPerPage;
    const result = prisma.edge.findMany({
      skip: skipNo,
      take: countPerPage,
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
      where: { edge_id: edgeId },
      data: edge,
    });
    prisma.$disconnect();
    return result;
  };

  public deleteEdge = async (edgeId: number): Promise<edge> => {
    const result = await prisma.edge.delete({
      where: { edge_id: edgeId },
    });
    prisma.$disconnect();
    return result;
  };
}

export default EdgeService;
