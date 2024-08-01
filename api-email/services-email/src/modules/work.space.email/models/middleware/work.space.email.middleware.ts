import { Schema } from 'mongoose';
import { WorkSpaceEmailDoc } from '../interface/work.space.email.schema.interface';
import { MyValidate } from './work.space.email.middleware.validate';


export class workSpaceEmailMiddleware {

  static validate(schema: Schema<WorkSpaceEmailDoc>): void {

    schema.pre('validate', async function(next) {

      const myValidate = new MyValidate()
      if (this.isNew || this.isModified('slug')){
        await myValidate.workSpaceNoRepeatSlug(this.slug, this.workSpaceId)
      } 

      next();
    });

  }
}
