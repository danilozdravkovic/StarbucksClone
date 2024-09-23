import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  isMenuPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Check if the current route is the menu page 
      this.isMenuPage = this.router.url.includes('menu');
    });
  }
}
