import { Component, OnInit } from '@angular/core';
import { INavbarItem } from 'src/app/main-layout/interfaces/i-navbar-item';
import { NavbarService } from 'src/app/main-layout/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private navbarService : NavbarService
  ){}

  navbarItems: INavbarItem[] = [];

  ngOnInit () : void {
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
