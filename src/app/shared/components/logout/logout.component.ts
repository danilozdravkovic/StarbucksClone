import { Component } from '@angular/core';
import { UserService } from 'src/app/account/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  
  constructor(private userService:UserService) {
  
  }

  logUserOut():void {
    console.log("sdad");
    this.userService.logUserOut().subscribe({
      next : (data) =>{},
      error:(err) =>{
        console.log(err);
      }
    });
  }
}
