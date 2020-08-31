import { FactureData } from './FactureData';
import { RoleData, IRole } from './RoleData';



export interface IPaiement{
 id?: number;
 montant?: any;
 factures? :FactureData[];
 typePaiement? : any;

}
export class PaiemetData implements IPaiement {
constructor(
  public id?: number,
  public montant?: any,
  public factures?:FactureData[],
  public typePaiement? :any,


){


}
    
  
  }

