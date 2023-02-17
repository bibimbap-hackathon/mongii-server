import ModuleService from './module.service';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ModuleDto } from './module.dto';

class ModuleController {
  public moduleService = new ModuleService();

  public createModule = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const module = plainToInstance(ModuleDto, req.body);
      const createdModule = await this.moduleService.createModule(module);
      res.status(201).json({ data: createdModule, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllModules = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let pageNo = Number(req.query.pageNo);
      if (isNaN(pageNo)) pageNo = 0;
      const getModules = await this.moduleService.getAllModules(pageNo);
      res.status(200).json({ data: getModules, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getModuleById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const moduleId = Number(req.params.id);
      const getModule = await this.moduleService.getModuleById(moduleId);
      res.status(200).json({ data: getModule, message: 'getOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateModule = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const moduleId = Number(req.params.id);
      const module = plainToInstance(ModuleDto, req.body);
      const updateModule = await this.moduleService.updateModule(moduleId, module);
      res.status(200).json({ data: updateModule, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteModule = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const moduleId = Number(req.params.id);
      const deleteModule = await this.moduleService.deleteModule(moduleId);
      res.status(200).json({ data: deleteModule, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ModuleController;
