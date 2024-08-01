import { BaseReader } from "@Commons/crud/crud.reader.base";
import { EmailShedulerDoc } from "../interface/email.scheduler.schema.interface";
import { EmailShedulerFilter } from "../filter/email.scheduler.filter";
import { EmailShedulerPopulate } from "../populate/email.scheduler.populate";
import { EmailSheduler } from "../email.scheduler.model";


export class EmailShedulerRead extends BaseReader<EmailShedulerDoc> {

  filter: EmailShedulerFilter;
  populate: EmailShedulerPopulate;

  constructor() {
    super("EmailShedulerId");
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