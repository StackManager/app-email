import { Schema } from 'mongoose';
import { EmailShedulerDoc } from '../interface/email.scheduler.schema.interface';
import { MyValidate } from './email.scheduler.middleware.validate';


export class EmailShedulerMiddleware {

  static validate(schema: Schema<EmailShedulerDoc>): void {

    schema.pre('validate', async function(next) {

      const myValidate = new MyValidate()

      next();
    });

  }
}
