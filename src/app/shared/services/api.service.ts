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

private apiPrefix : string = this.apiPath.endsWith(".json") ? config.LOCAL : config.SERVER;

  getAll() : Observable<any>{
    return this.http.get(this.apiPrefix +this.apiPath);
  }
}
