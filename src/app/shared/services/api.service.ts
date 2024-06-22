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

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded(){
    return this._refreshNeeded$;
  }

  protected apiPrefix : string = this.apiPath.endsWith(".json") ? config.LOCAL : config.SERVER;

  getAll() : Observable<any>{
    return this.http.get(this.apiPrefix +this.apiPath);
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
    return this.http.post(this.apiPrefix+this.apiPath,dataToSend);
  }

  put(id:number,dataToSend:any) : Observable<any>{
    return this.http.put(this.apiPrefix+this.apiPath+"/"+id,dataToSend).pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      }) 
    );

  }
}
