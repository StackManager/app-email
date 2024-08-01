
import { Request, Response, NextFunction, Router } from 'express';
import { WorkSpaceEmailCreateService } from '../services/work.space.email.create.service';
import { WorkSpaceEmailListService } from '../services/work.space.email.list.service';
import { WorkSpaceEmailEditService } from '../services/work.space.email.edit.service';
import { WorkSpaceEmailStatusService } from '../services/work.space.email.status.service';
import { WorkSpaceEmailDeletedService } from '../services/work.space.email.delete.service';

const routers = Router();

// Ruta POST crear una nueva instancia
routers.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new WorkSpaceEmailCreateService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET para obtener el listado con paginador
routers.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new WorkSpaceEmailListService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

// Ruta PUT editar una nueva instancia
routers.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new WorkSpaceEmailEditService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET para cambiar el estatus de este elemento
routers.patch('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new WorkSpaceEmailStatusService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });  
});

// Ruta DELETE para eliminar de manera SOFT
routers.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new WorkSpaceEmailDeletedService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

export { routers as WorkSpaceEmailRoutes };

