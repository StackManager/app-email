import mongoose, { Schema } from 'mongoose';
import { SCHEMAEMAILSHEDULER, EmailShedulerDoc } from './interface/email.scheduler.schema.interface';
import { EmailShedulerMiddleware } from './middleware/email.scheduler.middleware';
import paginate from 'mongoose-paginate-v2';

const workSpaceSchema = new mongoose.Schema<EmailShedulerDoc>({
  workSpaceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  recipient:{
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  vars: {
    type: Schema.Types.Mixed,
    required: true,
    default: {},
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  lastUpdateDate: {
    type: Date,
    default: Date.now,
  }
});

EmailShedulerMiddleware.validate(workSpaceSchema);
workSpaceSchema.plugin(paginate);
const EmailSheduler = global.dbtc.model<EmailShedulerDoc, mongoose.PaginateModel<EmailShedulerDoc>>(SCHEMAEMAILSHEDULER, workSpaceSchema);
export { EmailSheduler };