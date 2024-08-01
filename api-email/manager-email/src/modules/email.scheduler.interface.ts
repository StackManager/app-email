import { ObjectId } from 'mongodb';

export interface Email {
  _id: ObjectId;
  workSpaceId: ObjectId;
  slug: string;
  status: boolean;
  deleted: boolean;
  registrationDate: Date;
  lastUpdateDate: Date;
  __v: number;
  recipient: string;
  name?: string;
  vars: any;
}

export interface EmailPaused extends Email {
  stopper: string;
}

export interface EmailTemplate {
  _id: ObjectId;
  workSpaceId: ObjectId;
  name: string;
  subject: string;
  description: string;
  slug: string;
  content: string;
  status: boolean;
  deleted: boolean;
  tags: string[];
  version: number;
  attachments: any[];
  priority: string;
  registrationDate: Date;
  lastUpdateDate: Date;
  __v: number;
}
