import { NextFunction, Request, Response } from 'express';
import NodeService from './node.service';
import { plainToInstance } from 'class-transformer';
import { NodeDto } from './node.dto';

class NodeController {
  public nodeService = new NodeService();

  public createNode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const node = plainToInstance(NodeDto, req.body);
      const createdNode = await this.nodeService.createNode(node);
      res.status(201).json({ data: createdNode, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllNodes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let pageNo = Number(req.query.pageNo);
      if (isNaN(pageNo)) pageNo = 0;
      const getNodes = await this.nodeService.getAllNodes(pageNo);
      res.status(200).json({ data: getNodes, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNodeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const nodeId = Number(req.params.id);
      const getNode = await this.nodeService.getNodeById(nodeId);
      res.status(200).json({ data: getNode, message: 'getOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateNode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const nodeId = Number(req.params.id);
      const node = plainToInstance(NodeDto, req.body);
      const updateNode = await this.nodeService.updateNode(nodeId, node);
      res.status(200).json({ data: updateNode, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const nodeId = Number(req.params.id);
      const deleteNode = await this.nodeService.deleteNode(nodeId);
      res.status(200).json({ data: deleteNode, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default NodeController;
