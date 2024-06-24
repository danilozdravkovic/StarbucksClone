import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/account/services/user.service';
import { INavbarItem } from 'src/app/main-layout/interfaces/i-navbar-item';
import { NavbarService } from 'src/app/main-layout/services/navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private navbarService : NavbarService,
    private userService : UserService
  ){}

  navbarItems: INavbarItem[] = [];
  currentUser: any;
  ngOnInit () : void {

    const userLoggedIn = localStorage.getItem("user");
    if(userLoggedIn){
      this.currentUser=JSON.parse(userLoggedIn);
    }
    
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

    this.navbarService.getAll().subscribe({ 
      next : (data) =>{
        this.navbarItems=data;
      },
      error:(err) =>{
        console.log(err);
      }
    });
  }


}
