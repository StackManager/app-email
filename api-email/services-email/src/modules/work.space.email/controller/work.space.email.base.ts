import { MiddlewareController } from '@Commons/middleware/middleware.controller';
import { Request, Response, NextFunction } from 'express';


export class WorkSpaceEmailBase extends MiddlewareController {

  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }
}