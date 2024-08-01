
import { Router } from 'express';
import { WorkSpaceEmailRoutes } from './work.space.email.routes';
const routers = Router();


routers.use('/v1/work-space-email', WorkSpaceEmailRoutes);


export { routers as WorkSpaceMainRoutes};