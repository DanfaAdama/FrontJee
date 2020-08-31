import { ProduitData } from './ProduitData';
export interface IStock{
  
  id?:number;  
  quantiteStock?: number;
  quantiteSeuil?: number;
  prixUnitaire?: number;
  produit?: any;
  id_produit?:any;
}
export class StockData implements IStock {
  constructor(
    public id?: number,
    public quantiteStock?: number,
    public quantiteSeuil?: number,
    public prixUnitaire?: number,
    public produit?: any,
    public id_produit?:any
  ){

  }

  
  }

