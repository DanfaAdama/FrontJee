import { Injectable,Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector,private route:Router) { }

  intercept(requete, next)
  {
   let token = localStorage.getItem('token');
   if(requete.url.endsWith('login')){
     token = null;
   }
   if (token) {
     requete = requete.clone(
       {
         setHeaders: { Authorization: `Bearer ${token}` }
       }
     );
   }
       return next.handle(requete).pipe(
          tap(()=>{

          },
          (err)=>{
             if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                   this.route.navigate(['auth/signin']);
                }else if(err.status === 403){
                   this.route.navigate(['accessdenied']);
                }else if(err.status === 500){
                 this.route.navigate(['accessdenied']);
              }
             }
          }
          )
       );

  }

}
