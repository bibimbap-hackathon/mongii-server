import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import PanelService from './panel.service';
import { PanelDto } from './panel.dto';

class PanelController {
  public panelService = new PanelService();

  public createPanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const panel = plainToInstance(PanelDto, req.body);
      const createdPanel = await this.panelService.createPanel(panel);
      res.status(201).json({ data: createdPanel, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllPanels = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let pageNo = Number(req.query.pageNo);
      if (isNaN(pageNo)) pageNo = 0;
      const getPanels = await this.panelService.getAllPanels(pageNo);
      res.status(200).json({ data: getPanels, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPanelById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const panelId = Number(req.params.id);
      const getPanel = await this.panelService.getPanelById(panelId);
      res.status(200).json({ data: getPanel, message: 'getOne' });
    } catch (error) {
      next(error);
    }
  };

  public updatePanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const panelId = Number(req.params.id);
      const panel = plainToInstance(PanelDto, req.body);
      const updatePanel = await this.panelService.updatePanel(panelId, panel);
      res.status(200).json({ data: updatePanel, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const panelId = Number(req.params.id);
      const deletePanel = await this.panelService.deletePanel(panelId);
      res.status(200).json({ data: deletePanel, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PanelController;
