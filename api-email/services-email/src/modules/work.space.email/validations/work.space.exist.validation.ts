import { ValidateSchema } from "@Commons/validator/schema.validator";
import { WorkSpaceEmailDoc } from "../models/interface/work.space.email.schema.interface";
import { WorkSpaceEmail } from "../models/work.space.email.model";



export class WorkSpaceEmailExist {

  async validateOrFail(keyPublic: string): Promise<WorkSpaceEmailDoc> {

    return await ValidateSchema.validateExistenceOrFail<WorkSpaceEmailDoc>({
      model: WorkSpaceEmail,
      filter: { keyPublic },
      fieldName: 'domain'
    })
  }

}
