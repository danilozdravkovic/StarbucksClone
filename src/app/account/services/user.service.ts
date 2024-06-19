import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, Subject, tap } from 'rxjs';
import { apis } from 'src/app/constants/apis';
import { ApiService } from 'src/app/shared/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(http : HttpClient,private router:Router) {
    super(http,apis.server.users);
   }

   private _loggedIn = new Subject<boolean>();

   get loggedIn$() {
    return this._loggedIn.asObservable();
  }

   signInUser(dataToSend:any) : Observable<any>{
    return this.http.post<any>(this.apiPrefix+this.apiPath+"/signin",dataToSend).pipe(
      tap(data => {
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        localStorage.setItem('user', JSON.stringify(decoded));
        this._loggedIn.next(true);
        this.router.navigate(["main/menu"]);
      })
    );
  }

  logUserOut() : Observable<any>{
    return this.http.delete(this.apiPrefix+this.apiPath+"/logout").pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this._loggedIn.next(false); // Notify subscribers that the user is logged out
      })
    );
  }
}
