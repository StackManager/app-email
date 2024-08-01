import { WorkSpaceEmailBase } from "../controller/work.space.email.base";
import { WorkSpaceEmailList } from "../models/crud/work.space.email.list";


export class WorkSpaceEmailListService extends WorkSpaceEmailBase {

  getSession = true;
  permissionService =  ["work_space_email_list"]

  async run() {

    const {id, name, page = 1, pageSize = 10, status, deleted } = this.req.query;
    const list = new WorkSpaceEmailList();
    if (id) list.filter.id(id);
    if (name) list.filter.name(name);
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