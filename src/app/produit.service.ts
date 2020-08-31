import { ProduitData } from './modele/ProduitData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiService = "http://localhost:8080";

  constructor(private http: HttpClient) { }
   getProduit() {
    return this.http.get<any>(this.apiService + '/ressources/produits/liste');
  }
  saveOrUpdateProduit(produit){
       return this.http.post<ProduitData>(this.apiService + '/ressources/produits/add', produit);
  }
 
deleteProduits(id){
  return this.http.delete<ProduitData>(this.apiService + '/ressources/produits/delete/'+id);
}

public getProduitByCategorie(categorie: string) {
  return this.http.get<any>(this.apiService + '/ressources/produits/rechercher/'+categorie);
}
}
