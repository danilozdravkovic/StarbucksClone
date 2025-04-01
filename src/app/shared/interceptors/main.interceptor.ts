import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");

    setTimeout(() => {
      this.loaderService.show(); 
    });

    const newRequest = token ? request.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    }) : request;

    return next.handle(newRequest).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
