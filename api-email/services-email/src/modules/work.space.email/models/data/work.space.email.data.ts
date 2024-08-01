import { ValidateRequired } from "@Commons/validator/required.validator";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";
import { ValidateRegex } from "@Commons/validator/regex.validator";
import { alphanumericAndSpacesRegex, htmlCharactersRegex } from "@Commons/constants/regex";
import { DataBase } from "@Commons/crud/crud.data.base";
import { generateSlug } from "@Commons/format/string";
import { ValidateObjectId } from "@Commons/validator/object.id.validator";


export class WorkSpaceEmailData extends DataBase{
  
  protected nameId: string = "workspaceEmail";
  name: string = '';
  description: string = '';
  content: string = '';
  subject: string = '';
  slug: string = '';
  status: boolean = false;
  registrationDate: Date = new Date();
  lastUpdateDate: Date = new Date();
  deleted: boolean = false; 
  wordSpaceId: string = ''
  
  // Getter y Setter para 'name'
  getName(): string {
    return this.name;
  }

  setName(value: any): void {
    ValidateRequired.validateOrFail({value: value, name: 'name'});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 100, name: 'name'});
    ValidateMinLength.validateOrFail({value: value, minLength: 3, name: 'name'});
    ValidateRegex.validateOrFail({ value, name: 'name', regex: alphanumericAndSpacesRegex });
    this.name = value;
  }

  // Getter y Setter para 'description'
  getDescription(): string | undefined {
    return this.description;
  }
  setDescription(value:  any ): void {
    if (this.description == undefined) return 
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name: 'description'});
    ValidateRegex.validateOrFail({ value, name: 'description', regex: alphanumericAndSpacesRegex });
    this.description = value;
  }

  // Getter y Setter para 'content'
  getContent(): string {
    return this.content;
  }
  setContent(value:  any ): void {
    ValidateMaxLength.validateOrFail({value: value, maxLength: 6000, name: 'content'});
    ValidateRegex.validateOrFail({ value, name: 'content', regex: htmlCharactersRegex });
    this.content = value;
  }

  // Getter y Setter para 'subject'
  getSubject(): string {
    return this.subject;
  }
  setSubject(value:  any ): void {
    if (this.subject == undefined) return 
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name: 'subject'});
    ValidateRegex.validateOrFail({ value, name: 'subject', regex: alphanumericAndSpacesRegex });
    this.subject = value;
  }

  getSlug(){
    this.slug = generateSlug(this.name)
    return this.slug
  }

  setWorkSpaceId(value: string): void {
    const name = 'workSpaceId';
    ValidateRequired.validateOrFail({ value, name });
    ValidateObjectId.validateOrFail({ value, name });
    this.wordSpaceId = value;
  }

  getWorkSpaceId(){
    return this.wordSpaceId
  }

}