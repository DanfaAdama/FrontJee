import { ProduitData } from './ProduitData';

export interface IDetail{
    id?: number;
    quantite?:any;
    description?:string;
    etat?:string;
    prix?:number;
    commande?:any;
    produit?:any;

}
export class DetailCommandeData implements IDetail {
    constructor(
      public id?: number,
      public quantite?:any,
      public description?:string,
      public etat?:string,
      public prix?:number,
      public commande?:any,
      public produit?:any,
  
    
    ){
    
   
    }
        
      
      }
    
