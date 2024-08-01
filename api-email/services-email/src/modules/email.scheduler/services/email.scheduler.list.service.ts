import { EmailShedulerBase } from "../controller/email.scheduler.base";
import { EmailShedulerList } from "../models/crud/email.scheduler.list";



export class EmailShedulerListService extends EmailShedulerBase {

  getSession = true;
  permissionService =  ["email_schedule_list"]

  async run() {

    const {id, page = 1, pageSize = 10, status, deleted } = this.req.query;
    const list = new EmailShedulerList();
    if (id) list.filter.id(id);
    if (status) list.filter.status(status);
    if (deleted) list.filter.deleted(deleted);
    list.filter.workSpaceId(this.session.workSpaceId);
    const result = await list.paginate({
      page, 
      limit: pageSize
    });

    this.res.status(200).json({
      elements: result.docs,
      total: result.totalDocs
    });
  }
}