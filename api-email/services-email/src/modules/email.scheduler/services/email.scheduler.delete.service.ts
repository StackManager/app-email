import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";
import { EmailShedulerBase } from "../controller/email.scheduler.base";
import { EmailShedulerRead } from "../models/crud/email.scheduler.read";



export class EmailShedulerDeletedService extends EmailShedulerBase {

  getSession = true;
  permissionService =  ["email_schedule_delete"]
  read: EmailShedulerRead = new EmailShedulerRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;
    //Get the instance with read
    const doc = await this.read.getById(id);

    if (doc.workSpaceId.toString() != this.session.workSpaceId) throw new NotAuthorizedError();

    //Update status
    doc.deleted = !doc.deleted;
    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({ name: doc.slug, deleted: doc.deleted });
  }
}