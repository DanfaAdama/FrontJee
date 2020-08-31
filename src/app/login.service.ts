import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiService = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  public LoginRequest(user: any) {
    return this.http.post<any>(this.apiService + '/login', user);
  }

  saveToken(json){
    localStorage.setItem('token', json.accessToken);
    localStorage.setItem('roles', JSON.stringify(json.authorities));
    localStorage.setItem('username', json.username);
    localStorage.setItem('userConnected', JSON.stringify(json));
    
    console.log(localStorage.getItem('cardItem'+json.username));
  }

  // logout(){
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('roles');
  //   localStorage.removeItem('username');
  // }
}