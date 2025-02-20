import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { apis } from 'src/app/constants/apis';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService {

  constructor(http : HttpClient) {
    super(http,apis.server.orders)
   }

   reorder(id:any) : Observable<any>{
       return this.http.post(this.apiPrefix+this.apiPath+`/${id}`,null).pipe(
         tap(()=>{
          this._refreshNeeded$.next();
         }) 
       );
     }
}
