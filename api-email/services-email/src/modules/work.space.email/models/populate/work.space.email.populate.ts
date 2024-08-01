import { PopulateMongose } from "@Commons/mongose/populate.mongose";


export class WorkSpaceEmailPopulate extends PopulateMongose{

  fields(select = ''){
    return 'name status deleted ' + select
  }

}