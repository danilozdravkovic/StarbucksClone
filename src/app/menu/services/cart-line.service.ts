import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { apis } from 'src/app/constants/apis';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CartLineService extends ApiService {

  constructor(http : HttpClient) {
    super(http,apis.server.cartLines)
   }

  toggleProductIsFavourite(id:number) : Observable<any>{
    return this.http.patch(this.apiPrefix+this.apiPath+"/"+id,null).pipe(
      tap(()=>{
      }) 
    );
  }
}
