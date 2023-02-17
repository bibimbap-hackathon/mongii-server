import ScriptService from './script.service';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ScriptDto } from './script.dto';

class ScriptController {
  public scriptService = new ScriptService();

  public createScript = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const script = plainToInstance(ScriptDto, req.body);
      const createdScript = await this.scriptService.createScript(script);
      res.status(201).json({ data: createdScript, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllScript = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let pageNo = Number(req.query.pageNo);
      if (isNaN(pageNo)) pageNo = 0;
      const getScripts = await this.scriptService.getAllScripts(pageNo);
      res.status(200).json({ data: getScripts, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getScriptById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const scriptId = Number(req.params.id);
      const getScript = await this.scriptService.getScriptById(scriptId);
      res.status(200).json({ data: getScript, message: 'getOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateScript = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const scriptId = Number(req.params.id);
      const script = plainToInstance(ScriptDto, req.body);
      const updateScript = await this.scriptService.updateScript(
        scriptId,
        script
      );
      res.status(200).json({ data: updateScript, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteScript = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const scriptId = Number(req.params.id);
      const deleteScript = await this.scriptService.deleteScript(scriptId);
      res.status(200).json({ data: deleteScript, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ScriptController;
