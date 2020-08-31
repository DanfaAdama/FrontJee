import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryData } from './modele/CategoryData';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiService = "http://localhost:8080";


  constructor(private http: HttpClient) { }
  getCategorie() {
    return this.http.get<any>(this.apiService + '/ressources/categories/liste');
  }
  saveOrUpdateCategorie(categorie){
       return this.http.post<CategoryData>(this.apiService + '/ressources/categories/add', categorie);
  }
  deleteCategorie(id){
    return this.http.delete<CategoryData>(this.apiService + '/ressources/categories/delete/'+id);
}
}
