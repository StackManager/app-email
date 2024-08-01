import { BaseList } from "@Commons/crud/crud.list.base";
import { EmailShedulerDoc } from "../interface/email.scheduler.schema.interface";
import { EmailShedulerFilter } from "../filter/email.scheduler.filter";
import { EmailShedulerPopulate } from "../populate/email.scheduler.populate";
import { EmailSheduler } from "../email.scheduler.model";

export class EmailShedulerList extends BaseList<EmailShedulerDoc> {

  filter: EmailShedulerFilter;
  populate: EmailShedulerPopulate;

  constructor() {
    super("EmailSheduler");
    this.filter = new EmailShedulerFilter(this.filterManager);
    this.populate = new EmailShedulerPopulate(this.populateModules);
  }
  
  getModel(){
    return EmailSheduler;
  }

  getData(doc: EmailShedulerDoc){

    return {
      name: doc.slug,
    }
  }

}