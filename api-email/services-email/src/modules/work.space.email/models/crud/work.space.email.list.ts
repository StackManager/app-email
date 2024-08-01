import { BaseList } from "@Commons/crud/crud.list.base";
import { WorkSpaceEmailDoc } from "../interface/work.space.email.schema.interface";
import { WorkSpaceEmailFilter } from "../filter/work.space.email.filter";
import { WorkSpaceEmailPopulate } from "../populate/work.space.email.populate";
import { WorkSpaceEmail } from "../work.space.email.model";

export class WorkSpaceEmailList extends BaseList<WorkSpaceEmailDoc> {

  filter: WorkSpaceEmailFilter;
  populate: WorkSpaceEmailPopulate;

  constructor() {
    super("WorkSpaceEmail");
    this.filter = new WorkSpaceEmailFilter(this.filterManager);
    this.populate = new WorkSpaceEmailPopulate(this.populateModules);
  }
  
  getModel(){
    return WorkSpaceEmail;
  }

  getData(doc: WorkSpaceEmailDoc){

    return {
      name: doc.name,
    }
  }

}