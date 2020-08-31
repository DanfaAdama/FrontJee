import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustumerData } from './modele/CustumerData';

@Injectable({
  providedIn: 'root'
})
export class CustumersService {

  private apiService = "http://localhost:8080";


  constructor(private http: HttpClient) { }
  getCustumers() {
    return this.http.get<any>(this.apiService + '/users/liste');
  }
  saveOrUpdateCustumers(custumer){
       return this.http.post<CustumerData>(this.apiService + '/users/add', custumer);
  }
  deleteCustumers(id){
    return this.http.delete<CustumerData>(this.apiService + '/users/delete/'+id);
}
getRoles() {
  return this.http.get<any>(this.apiService + '/roles/liste');
}

getUserByUsername(username) {
  return this.http.get<any>(this.apiService + '/getusersbyusername/'+ username);
}

}
