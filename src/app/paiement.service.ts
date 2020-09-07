import { PaiemetData } from './modele/PaiementData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
 
  private apiService = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  getPaiement() {
    return this.http.get<any>(this.apiService + '/ressources/paiement/liste');
  }
  saveOrUpdatePaiement(paiement){
       return this.http.post<PaiemetData>(this.apiService + '/ressources/paiement/add', paiement);
  }
 
deletePaiement(id){
  return this.http.delete<PaiemetData>(this.apiService + '/ressources/paiement/delete/'+id);
}


}
