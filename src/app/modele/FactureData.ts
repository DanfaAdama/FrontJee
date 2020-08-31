import { RoleData, IRole } from './RoleData';

export interface IFacture{

 id?: number;
 numero?: any;
 date? :any;
  paiement?:any;
  commande?:any;
}
export class FactureData implements IFacture {
constructor(
  public id?: any,
  public numero?: any,
  public paiement? :any,
  public commande? : any,
 

){


}
    
  
  }

