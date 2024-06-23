import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any; 
  
  constructor() {
    let user = localStorage.getItem("user");
    if(user){
      this.currentUser=JSON.parse(user);
    }
   }

  getCurrentUser() {
    return this.currentUser;
  }
}
