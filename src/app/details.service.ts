import { DetailCommandeData } from './modele/DetailCommandeData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private apiService = "http://localhost:8080";


  constructor(private http: HttpClient) { }
  getDetails() {
    return this.http.get<any>(this.apiService + '/liste');
  }
  saveOrUpdateDetails(detail){
       return this.http.post<DetailCommandeData>(this.apiService + '/add', detail);
  }
 
deleteDetails(id){
  return this.http.delete<DetailCommandeData>(this.apiService + '/delete/'+id);
}
getOnById(id){
  return this.http.get<any>(this.apiService + '/get/'+id);

}


}
