import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { config } from 'src/app/constants/config';
import { map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  constructor(
    protected http:HttpClient,
    @Inject("apiPath") protected apiPath : string
  ) { }

   _refreshNeeded$ = new Subject<void>();

  get refreshNeeded(){
    return this._refreshNeeded$;
  }

  protected apiPrefix : string = this.apiPath.endsWith(".json") ? config.LOCAL : config.SERVER;

  getAll(perPage?:number,page?:number,dateFrom?:Date,dateTo?:Date,isForUserOnly?:boolean) : Observable<any>{
    let query = `${this.apiPrefix}${this.apiPath}`;
    const params = [];
    
    if (perPage !== undefined) {
      params.push(`perPage=${perPage}`);
    }
    if (page !== undefined) {
      params.push(`page=${page}`);
    }
    if(dateFrom !== undefined){
      params.push(`dateFrom=${dateFrom.toISOString()}`);
    }
    if(dateTo !== undefined){
      params.push(`dateTo=${dateTo.toISOString()}`);
    }
    if(isForUserOnly !== undefined){
      params.push(`isForUserOnly=${isForUserOnly}`);
    }
  
    if (params.length > 0) {
      query += '?' + params.join('&');
    }
  
    return this.http.get(query).pipe(
      tap(() => {
        
      })
    );
  }

  getOne(id:number) : Observable<any>{
    if(this.apiPath.endsWith(".json")){
      return this.http.get<any[]>(this.apiPrefix+this.apiPath).pipe(
        map(products=>products.find((product:any)=>product.id===id)));
    }
    else{
      return this.http.get<any>(this.apiPrefix+this.apiPath+"/"+id);
    }

    
  }

  post(dataToSend:any) : Observable<any>{
    return this.http.post(this.apiPrefix+this.apiPath,dataToSend).pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      }) 
    );
  }

  put(id:number,dataToSend:any) : Observable<any>{
    return this.http.put(this.apiPrefix+this.apiPath+"/"+id,dataToSend).pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      }) 
    );
  }

  delete(id:number) : Observable<any>{
    return this.http.delete(this.apiPrefix+this.apiPath+"/"+id).pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      }) 
    );
  }
}
