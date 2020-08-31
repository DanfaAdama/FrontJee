import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private apiService = "http://localhost:8080";

  constructor(private http: HttpClient) { }
   getCategories() {
    return this.http.get<any>(this.apiService + '/ressources/categories/liste');
  }
  getProduit() {
    return this.http.get<any>(this.apiService + '/ressources/produits/liste');
  }
  // getCategoriesById(id) {
  //   return this.http.get<any>(this.apiService + '/specialite/findbyservice?service_id=' + id);
  // }
}
