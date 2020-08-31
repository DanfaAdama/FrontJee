import { StockData } from './modele/StockData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiService = "http://localhost:8080";

  constructor(private http: HttpClient) { }
   getStock() {
    return this.http.get<any>(this.apiService + '/ressources/stocks/liste');
  }
  saveOrUpdateStock(stock){
       return this.http.post<StockData>(this.apiService + '/ressources/stocks/add', stock);
  }
 
deleteStock(id){
  return this.http.delete<StockData>(this.apiService + '/ressources/stocks/delete/'+id);
}}
