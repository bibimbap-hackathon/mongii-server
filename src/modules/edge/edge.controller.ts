import EdgeService from './edge.service';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { NodeDto } from '../node/node.dto';
import { EdgeDto } from './edge.dto';

class EdgeController {
  public edgeService = new EdgeService();

  public createEdge = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const edge = plainToInstance(EdgeDto, req.body);
      const createdEdge = await this.edgeService.createEdge(edge);
      res.status(201).json({ data: createdEdge, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllEdges = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let pageNo = Number(req.query.pageNo);
      if (isNaN(pageNo)) pageNo = 0;
      const getEdges = await this.edgeService.getAllEdges(pageNo);
      res.status(200).json({ data: getEdges, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEdgeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const edgeId = Number(req.params.id);
      const getEdge = await this.edgeService.getEdgeById(edgeId);
      res.status(200).json({ data: getEdge, message: 'getOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateEdge = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const edgeId = Number(req.params.id);
      const edge = plainToInstance(EdgeDto, req.body);
      const updateEdge = await this.edgeService.updateEdge(edgeId, edge);
      res.status(200).json({ data: updateEdge, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEdge = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const edgeId = Number(req.params.id);
      const deleteEdge = await this.edgeService.deleteEdge(edgeId);
      res.status(200).json({ data: deleteEdge, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default EdgeController;
