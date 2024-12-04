import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/account/services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  constructor(private router: Router,private userService: UserService) {
    this.router.events.subscribe(() => {
      // Check if the current route is the menu page 
      this.isMenuPage = this.router.url.includes('menu');
    });
  }

  isMenuPage: boolean;
  isUserLoggedIn: boolean;

  ngOnInit():void {
    this.userService.loggedIn$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
    });

    // Initialize the login state
    this.isUserLoggedIn = localStorage.getItem('user') !== null;
  }
}
