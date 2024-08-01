import { BaseReader } from "@Commons/crud/crud.reader.base";
import { WorkSpaceEmailDoc } from "../interface/work.space.email.schema.interface";
import { WorkSpaceEmailFilter } from "../filter/work.space.email.filter";
import { WorkSpaceEmailPopulate } from "../populate/work.space.email.populate";
import { WorkSpaceEmail } from "../work.space.email.model";


export class WorkSpaceEmailRead extends BaseReader<WorkSpaceEmailDoc> {

  filter: WorkSpaceEmailFilter;
  populate: WorkSpaceEmailPopulate;

  constructor() {
    super("workSpaceEmailId");
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