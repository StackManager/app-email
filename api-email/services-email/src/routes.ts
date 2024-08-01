import { Router } from "express";
import { WorkSpaceMainRoutes } from "@WorkSpace/routes/main.routes";
import { EmailShedulerMainRoutes } from "@EmailScheduler/routes/main.routes";

export const routes: Router[] = [
  WorkSpaceMainRoutes,
  EmailShedulerMainRoutes
];