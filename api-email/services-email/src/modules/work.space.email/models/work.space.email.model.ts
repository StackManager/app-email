import mongoose from 'mongoose';
import { SCHEMAWORKSPACEEMAIL, WorkSpaceEmailDoc } from './interface/work.space.email.schema.interface';
import { workSpaceEmailMiddleware } from './middleware/work.space.email.middleware';
import paginate from 'mongoose-paginate-v2';

const workSpaceSchema = new mongoose.Schema<WorkSpaceEmailDoc>({
  workSpaceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  lastUpdateDate: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
  },
  version: {
    type: Number,
    default: 1,
  },
  attachments: {
    type: [String],
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
});

workSpaceEmailMiddleware.validate(workSpaceSchema);
workSpaceSchema.plugin(paginate);
const WorkSpaceEmail = global.dbtc.model<WorkSpaceEmailDoc, mongoose.PaginateModel<WorkSpaceEmailDoc>>(SCHEMAWORKSPACEEMAIL, workSpaceSchema);
export { WorkSpaceEmail };