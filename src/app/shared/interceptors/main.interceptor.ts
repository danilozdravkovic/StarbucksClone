import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    if(token){
      const newRrequest = request.clone({
        setHeaders:{
          Authorization : "Bearer "+token
        } 
      });
      return next.handle(newRrequest);
    } 
  
    return next.handle(request);
    
    
    
  }
}
