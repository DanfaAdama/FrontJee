import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandeData } from './modele/CommandeData';
import { ProduitService } from './produit.service';
import { CustumerData } from './modele/CustumerData';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  public commande:CommandeData=new CommandeData();


  private apiService = "http://localhost:8080";

  constructor(private http: HttpClient,private produitService:ProduitService) { }
  
  public setClient(client:CustumerData){
    this.commande.user=client;
  }



getCommande() {
  return this.http.get<any>(this.apiService + '/ressources/commandes/liste');
}
saveOrUpdateCommandes(commande){
     return this.http.post<CommandeData>(this.apiService + '/ressources/commandes/add', commande);
}
deleteCommandes(id){
  return this.http.delete<CommandeData>(this.apiService + '/ressources/commandesdelete/'+id);
}

}
