import { authServiceExternal } from "@Commons/microservices/authentification/external/authentification.login";
import { WorkSpaceEmailBase } from "../controller/work.space.email.base";
import { WorkSpaceEmailData } from "../models/data/work.space.email.data";
import { WorkSpaceEmail } from "../models/work.space.email.model";


export class WorkSpaceEmailCreateService extends WorkSpaceEmailBase {

  getSession = true;
  permissionService =  ["word_space_email_create"]

  async run() {
    const { 
      name,
      description,
      subject,
      content
    } = this.req.body;
  
    const dataModel = new WorkSpaceEmailData()
    dataModel.setName(name)
    dataModel.setDescription(description)
    dataModel.setContent(content)
    dataModel.setSubject(subject)
    dataModel.setWorkSpaceId(this.session.workSpaceId)

    const doc = new WorkSpaceEmail ({
      name: dataModel.getName(),
      description: dataModel.getDescription(),
      slug: dataModel.getSlug(),
      content: dataModel.getContent(),
      subject: dataModel.getSubject(),
      workSpaceId: dataModel.getWorkSpaceId(),
      status: true
    });
    
    await doc.save();
    const data = doc.toJSON();
    this.res.status(201).json({ ...data });
  }
}