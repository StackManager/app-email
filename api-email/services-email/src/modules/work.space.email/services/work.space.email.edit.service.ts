import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";
import { WorkSpaceEmailBase } from "../controller/work.space.email.base";
import { WorkSpaceEmailRead } from "../models/crud/work.space.email.read";
import { WorkSpaceEmailData } from "../models/data/work.space.email.data";


export class WorkSpaceEmailEditService extends WorkSpaceEmailBase {

  getSession = true;
  permissionService =  ["word_space_email_edit"]
  read: WorkSpaceEmailRead = new WorkSpaceEmailRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;
    const { 
      name,
      description,
      content,
      subject
    } = this.req.body;

    const dataModel = new WorkSpaceEmailData()
    dataModel.setName(name)
    dataModel.setDescription(description)
    dataModel.setContent(content)
    dataModel.setSubject(subject)

    //Get the instance with read
    const doc = await this.read.getById(id);
    if (doc.workSpaceId.toString() != this.session.workSpaceId) throw new NotAuthorizedError();

    //Edit
    doc.name = dataModel.getName()
    doc.description = dataModel.getDescription()
    doc.slug = dataModel.getSlug()
    doc.content = dataModel.getContent()
    doc.subject = dataModel.getSubject()
    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({name: doc.name, status: doc.status});
  }
}