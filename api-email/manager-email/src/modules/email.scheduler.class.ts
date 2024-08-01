import { Collection, ObjectId } from 'mongodb';
import { Connection } from 'mongoose';
import { Email, EmailPaused, EmailTemplate } from './email.scheduler.interface';
import { SenderAwsManager } from '@Commons/email/sender.aws.manager';
import { replaceVariables } from '@Commons/functions/string';


export class EmailScheduler {
  private historyCollection;
  private emailPausedCollection: Collection<EmailPaused>;
  private emailShedulerCollection: Collection<Email>;
  private templateCollection: Collection<EmailTemplate>;
  private senderManager: SenderAwsManager = new SenderAwsManager();

  constructor(db: Connection) {
    //this.sender = new SenderAWS()
    this.emailPausedCollection = db.collection('email.paused');
    this.emailShedulerCollection = db.collection('email.shedulers');
    this.historyCollection = db.collection('email.history');
    this.templateCollection = db.collection('email.work.spaces');
  }

  private async getPendingEmails(): Promise<Email[]> {
    return await this.emailShedulerCollection.find({ status: true, deleted: false }).limit(100).toArray();
  }

  private async getEmailTemplate(slug: string, workSpaceId: ObjectId): Promise<EmailTemplate | null> {
    return await this.templateCollection.findOne({ slug, workSpaceId, status: true, deleted: false });
  }


  private async managerTemplate (email: Email): Promise<EmailTemplate | null> {

    const template = await this.getEmailTemplate(email.slug, email.workSpaceId);

    if (!template) {
      // Después de enviar el email, moverlo a la colección de email pausados
      await this.emailPausedCollection.insertOne({ ...email, stopper: "template_no_found" });
    
      // Eliminar el email de la colección original
      await this.emailShedulerCollection.deleteOne({ _id: email._id });
      return null;
    }
    return template
  }

  private async send(email: Email): Promise<void> {

    const template = await this.managerTemplate(email)
    if (!template) return 

    // Aquí puedes agregar la lógica para enviar el email.
    // Por ejemplo, puedes usar un servicio como nodemailer, sendgrid, etc.
    console.log(`Enviando email a ${email.recipient}`);
    const html = replaceVariables(template.content, email.vars)
    
    // Lógica para enviar el email.
    const response = await this.senderManager.send({ 
      to: email.recipient,
      subject: template.subject,
      html
    })
    
    console.log(response.message, response.success)

    if (response.success) {
      // Después de enviar el email, moverlo a la colección de histórico
      await this.historyCollection.insertOne(email);
      
      // Eliminar el email de la colección original
      await this.emailShedulerCollection.deleteOne({ _id: email._id });
    
    }else{

      // Si la respuesta es fallida  desde el sender, pausamos el email
      // Después de enviar el email, moverlo a la colección de email pausados
      await this.emailPausedCollection.insertOne({ ...email, stopper: "sender_no_found" });
    
      // Eliminar el email de la colección original
      await this.emailShedulerCollection.deleteOne({ _id: email._id });
    }

  }

  public async sendEmails(): Promise<void> {

    //Si esta ejecutando otro envio cancelar
    if (global.sending) return
    //Obtiene los emails pendientes
    let emails = await this.getPendingEmails();
    
    //Colocamos sending en true, para evitar colapsar la maquina
    global.sending = true
    console.log("Sending emails", Date.now());
    for (const email of emails) {
        await this.send(email);
    }
    console.log("Sending emails finished", Date.now());
    //Colocamos el sending en false, para permitir el envio de mas emails
    global.sending = false
  }
}