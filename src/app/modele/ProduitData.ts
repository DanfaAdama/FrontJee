import { CategoryData } from './CategoryData';
import { StockData } from './StockData';
export interface IProduit{
  id?:number;  
   libelle?: string;
   etat?: string;
   prixNormal?: number;
   prixPromotion?: number;
   categorie?: any;
   photoName?:string;
   quantite?:any;
   id_categorie?:any;
   stocks?:StockData;
   
}
export class ProduitData implements IProduit {
  constructor(  
    public id?: number,
    public libelle?: string,
    public etat?: string,
    public prixNormal?: number,
    public prixPromotion?: number,
    public categorie?: any,
    public photoName?:string,
    public quantite?:any,
    public id_categorie?:string,
    public stocks?:StockData
 
    ){
    }
  }