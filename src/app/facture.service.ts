import { FactureData } from './modele/FactureData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private apiService = "http://localhost:8080";


  constructor(private http: HttpClient) { }
  getFacture() {
    return this.http.get<any>(this.apiService + '/ressources/factures/liste');
  }
  saveOrUpdateFacture(facture){
       return this.http.post<FactureData>(this.apiService + '/ressources/factures/add', facture);
  }
 
deleteFacture(id){
  return this.http.delete<FactureData>(this.apiService + '/ressources/factures/delete/'+id);
}

}
