import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiService = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getUsersConnected() {
    return this.http.get<any>(this.apiService + '/ressources/admin/liste');
  }
}
