import { PopulateMongose } from "@Commons/mongose/populate.mongose";


export class EmailShedulerPopulate extends PopulateMongose{

  fields(select = ''){
    return 'slug status deleted ' + select
  }

}