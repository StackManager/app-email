
import { Router } from 'express';
import { EmailShedulerRoutes } from './email.scheduler.routes';
const routers = Router();


routers.use('/v1/email-sheduler', EmailShedulerRoutes);


export { routers as EmailShedulerMainRoutes};