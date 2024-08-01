import { Schema, Document } from "mongoose";

export const SCHEMAWORKSPACEEMAIL = 'email.work.spaces'

// that are requried to create a new User
export interface WorkSpaceEmailAttrs {
  workSpaceId: Schema.Types.ObjectId; //El espacio de trabajo  donde esta subscrito el rol
  name: string;  // Nombre del email dentro del workspace
  description?: string; // Descripcion del email dentro del workspace
  slug: string;  // Slug del email dentro del workspace
  subject: string;  // Titulo del email
  content: string; // Se almacena todo el tipo de email, con las variables en modo ${variables}
  status: boolean; // Estado del dominio debe ser true para aprobar cualquier generacion de JWT
  registrationDate: Date; //Fecha de la creacion del workspace
  lastUpdateDate: Date; // Ultima actualizacion
  deleted: boolean; 

  tags?: string[];             // Etiquetas para categorizar o buscar emails
  version?: number;            // Versión del email, útil para llevar un control de cambios
  attachments?: string[];      // Lista de rutas o identificadores de archivos adjuntos
  language?: Schema.Types.ObjectId; // Idioma del email, útil en entornos multilingües
  priority?: 'low' | 'medium' | 'high'; // Prioridad del email

}

export interface WorkSpaceEmailDoc extends WorkSpaceEmailAttrs, Document{}  

