import { Component } from '@angular/core';
import { UserService } from 'src/app/account/services/user.service';
import { OrderService } from 'src/app/cart/services/order.service';


@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent {

  constructor(
    private userService: UserService,
    private orderService : OrderService
  ){}
  currentUser = localStorage.getItem("user");
  orders:any=[];

  ngOnInit () : void {

    this.getUserOrders();
    
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

  getUserOrders() : void {
    this.orderService.getAll().subscribe({
      next:(data)=>{
        console.log(data);
        this.orders=data.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
