import { Component } from '@angular/core';
import { UserService } from 'src/app/account/services/user.service';


@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent {

  constructor(
    private userService: UserService
  ){}
  currentUser = localStorage.getItem("user");

  ngOnInit () : void {
    
    this.userService.loggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const userJson = localStorage.getItem("user");
        if(userJson){
          this.currentUser=JSON.parse(userJson);
        }
      } else {
        this.currentUser = null;
      }
    });
  }
}
