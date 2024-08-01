
import { Request, Response, NextFunction, Router } from 'express';
import { EmailShedulerCreateService } from '../services/email.scheduler.create.service';
import { EmailShedulerListService } from '../services/email.scheduler.list.service';
import { EmailShedulerDeletedService } from '../services/email.scheduler.delete.service';

const routers = Router();

// Ruta POST crear una nueva instancia
routers.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new EmailShedulerCreateService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET para obtener el listado con paginador
routers.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new EmailShedulerListService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

// Ruta DELETE para eliminar de manera SOFT
routers.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new EmailShedulerDeletedService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

export { routers as EmailShedulerRoutes };

