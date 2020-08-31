import { PaiemetData } from './modele/PaiementData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
 
  private apiService = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  getFacture() {
    return this.http.get<any>(this.apiService + '/ressources/paiement/liste');
  }
  saveOrUpdateFacture(paiement){
       return this.http.post<PaiemetData>(this.apiService + '/ressources/paiement/add', paiement);
  }
 
deleteFacture(id){
  return this.http.delete<PaiemetData>(this.apiService + '/ressources/paiement/delete/'+id);
}
}
