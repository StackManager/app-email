import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";
import { WorkSpaceEmailBase } from "../controller/work.space.email.base";
import { WorkSpaceEmailRead } from "../models/crud/work.space.email.read";

export class WorkSpaceEmailStatusService extends WorkSpaceEmailBase {

  getSession = true;
  permissionService =  ["work_space_email_update_status"]
  read: WorkSpaceEmailRead = new WorkSpaceEmailRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;
    //Get the instance with read
    const doc = await this.read.getById(id);
    if (doc.workSpaceId.toString() != this.session.workSpaceId) throw new NotAuthorizedError();
    //Update status
    doc.status = !doc.status;
    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({name: doc.name, status: doc.status});
  }
}