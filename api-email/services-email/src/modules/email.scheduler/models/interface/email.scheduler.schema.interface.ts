import { Schema, Document } from "mongoose";

export const SCHEMAEMAILSHEDULER = 'email.sheduler'

// That are requried to manager Email Shedule
export interface EmailShedulerAttrs {
  workSpaceId: Schema.Types.ObjectId; // El espacio de trabajo  donde esta subscrito el rol
  slug: string;  // Slug del email dentro del workspace
  recipient: string;  // Slug del email dentro del workspace
  status: boolean; // Estado del dominio debe ser true para aprobar cualquier generacion de JWT
  registrationDate: Date; // Fecha de la creacion del workspace
  lastUpdateDate: Date; // Ultima actualizacion
  deleted: boolean; 
  vars: any;
}

export interface EmailShedulerDoc extends EmailShedulerAttrs, Document{}  

