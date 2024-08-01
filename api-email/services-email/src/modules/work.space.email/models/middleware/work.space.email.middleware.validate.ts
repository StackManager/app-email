import { Schema } from 'mongoose';
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { WorkSpaceEmailRead } from '../crud/work.space.email.read';


export class MyValidate{
  read: WorkSpaceEmailRead = new WorkSpaceEmailRead();


  async workSpaceNoRepeatSlug(slug: string, workSpaceId: Schema.Types.ObjectId){

    //Get the instance with read
    this.read.filter.slug(slug)
    this.read.filter.workSpaceId(workSpaceId.toString())
    const doc = await this.read.get()
    if (doc){
      throw new GenericError([{
        message: 'Duplicate workspace slug found',
        field: 'permission',
        detail: 'Duplicate workspace slug found',
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }

  }

}