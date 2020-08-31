import { DetailCommandeData } from './DetailCommandeData';
import { ProduitData } from './ProduitData';

export interface ICommande{
    id?: number;
    numero?:string;
    montant?:number;
    dateLivraison?:any;
   datecommande?:any;
    etat?:string;
    user?: any;
    id_user?:any;
    avance?:any;
    details_commandes?: DetailCommandeData[];
}

export class CommandeData implements ICommande {
    constructor(
      public id?: number,
      public numero?:string,
      public montant?:number,
      public dateLivraison?:any,
      public  datecommande?:any,
      public etat?:string,
      public user?: any,
      public id_user?:any,
      public avance?:any,
      public  details_commandes?: DetailCommandeData[]
    
    ){
    
    
    }
        
      
      }
    
