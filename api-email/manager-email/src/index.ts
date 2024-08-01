import './aliases/alias.configuration';
import { Connection } from 'mongoose';
import { DatabaseDataTrasacctional } from '@DB/database.transactional.connect';
import { EmailScheduler } from './modules/email.scheduler.class';
var cron = require('node-cron');

// Declara dbtc como una variable global
declare global {
  var dbtc: Connection;
  var sending: boolean;
 }
 
const start = async () => {
 
  try {
    // Initialize the global variables
    const dbtc = new DatabaseDataTrasacctional();
    //Initialize the global databases
    global.dbtc = await dbtc.get();
  
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

start();


const sendEmail = async () => {
  const emailScheduler = new EmailScheduler(global.dbtc);
  await emailScheduler.sendEmails();
};

cron.schedule('*/1 * * * *', sendEmail); // Ejecuta al inicio de cada minuto
cron.schedule('30 * * * * *', sendEmail); // Ejecuta a los 30 segundos de cada minuto
