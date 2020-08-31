export interface ICategory{
  id?:number;
  libelle?:string;
}
export class CategoryData  implements ICategory{
    constructor(
      public id?: number,
      public libelle?: string){}
 
  }

