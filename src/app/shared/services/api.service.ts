import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  constructor(
    protected http:HttpClient,
    @Inject("apiPath") protected apiPath : string
  ) { }

  getAll() : Observable<any>{
    return this.http.get(config.LOCAL+this.apiPath);
  }
}
