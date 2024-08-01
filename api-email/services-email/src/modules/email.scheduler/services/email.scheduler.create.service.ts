import { EmailShedulerBase } from "../controller/email.scheduler.base";
import { EmailShedulerData } from "../models/data/email.scheduler.data";
import { EmailSheduler } from "../models/email.scheduler.model";



export class EmailShedulerCreateService extends EmailShedulerBase {

  getSession = true;
  permissionService =  ["email_schedule_create"]

  async run() {
    const { 
      slug,
      vars,
      recipient
    } = this.req.body;
    
    const dataModel = new EmailShedulerData()
    dataModel.setSlug(slug)
    dataModel.setWorkSpaceId(this.session.workSpaceId)
    dataModel.setVars(vars)
    dataModel.setRecipient(recipient)


    const doc = new EmailSheduler ({
      slug: dataModel.getSlug(),
      workSpaceId: dataModel.getWorkSpaceId(),
      vars: dataModel.getVars(),
      recipient: dataModel.getRecipient()
    });

    await doc.save();
    const data = doc.toJSON();
    this.res.status(201).json({ ...data });
  }
}
