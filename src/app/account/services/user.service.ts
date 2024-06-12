import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apis } from 'src/app/constants/apis';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(http : HttpClient) {
    super(http,apis.users);
   }

   signInUser(dataToSend:any) : Observable<any>{
    return this.http.post(this.apiPrefix+this.apiPath+"/signin",dataToSend);
  }
}
