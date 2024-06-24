import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/account/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  
  constructor(private userService:UserService,private router : Router) {
  
  }

  logUserOut():void {
    this.userService.logUserOut().subscribe({
      next : (data) =>{
        this.router.navigate(["main/menu"]);
      },
      error:(err) =>{
        console.log(err);
      }
    });
  }
}
