import { ValidateRequired } from "@Commons/validator/required.validator";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";
import { ValidateRegex } from "@Commons/validator/regex.validator";
import { alphanumericAndSpacesRegex, alphanumericAndUnderscoresHyphensRegex, alphanumericEspecialRegex, base64PublicKeyRegex, emailRegex, htmlCharactersRegex } from "@Commons/constants/regex";
import { DataBase } from "@Commons/crud/crud.data.base";
import { generateSlug } from "@Commons/format/string";
import { ValidateObjectId } from "@Commons/validator/object.id.validator";


export class EmailShedulerData extends DataBase{
  
  protected nameId: string = "EmailSheduler";
  slug: string = '';
  wordSpaceId: string = ''
  vars: any = '';
  recipient: string = ''
  
  // Getter y Setter para 'slug'
  getSlug(): string {
    return this.slug;
  }

  setSlug(value: any): void {
    const name = 'slug'
    ValidateRequired.validateOrFail({value: value, name});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 100, name});
    ValidateMinLength.validateOrFail({value: value, minLength: 3, name });
    ValidateRegex.validateOrFail({ value, name: 'name', regex: alphanumericAndUnderscoresHyphensRegex });
    this.slug = value;
  }

  // Getter y Setter para 'Recipient'
  getRecipient(): string {
    return this.recipient;
  }
  
  setRecipient(value: any): void {
    const name = 'recipient'
    ValidateRequired.validateOrFail({ value, name });
    ValidateMaxLength.validateOrFail({ value, maxLength: 40, name });
    ValidateMinLength.validateOrFail({ value, minLength: 5, name });
    ValidateRegex.validateOrFail({ value, name, regex: emailRegex });
    this.recipient = value;
  }


  // Getter y Setter para 'workSpaceId'
  setWorkSpaceId(value: string): void {
    const name = 'workSpaceId';
    ValidateRequired.validateOrFail({ value, name });
    ValidateObjectId.validateOrFail({ value, name });
    this.wordSpaceId = value;
  }

  getWorkSpaceId(){
    return this.wordSpaceId
  }

  // Getter y Setter para 'slug'
  getVars(): string {
    return this.vars;
  }
  
  setVars(value: any): void {
    // Convertir todos los valores a cadenas de texto
    const stringValue = Object.keys(value).reduce((acc, key) => {
      acc[key] = String(value[key]);
      return acc;
    }, {} as { [key: string]: string });
  
    // Validar cada campo individualmente
    for (const key in stringValue) {
      if (Object.prototype.hasOwnProperty.call(stringValue, key)) {
        const fieldValue = stringValue[key];
  
        // Validar campo requerido
        ValidateRequired.validateOrFail({ value: fieldValue, name: key });
  
        // Validar longitud máxima
        ValidateMaxLength.validateOrFail({ value: fieldValue, maxLength: 100, name: key });
  
        // Validar longitud mínima
        ValidateMinLength.validateOrFail({ value: fieldValue, minLength: 3, name: key });
  
        // Validar que sea texto
        ValidateRegex.validateOrFail({ value: fieldValue, name: key, regex: alphanumericEspecialRegex });
      }
    }
    // Asignar el valor final a this.vars
    this.vars = stringValue;
  }

}