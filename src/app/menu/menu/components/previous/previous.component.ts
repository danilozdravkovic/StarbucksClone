import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private orderService : OrderService,
    private snackBar : MatSnackBar
  ){}

  currentUser = localStorage.getItem("user");
  orders:any=[];

  totalItems = 0;
  perPage = 10;
  currentPage = 0;

  dateFrom: Date| undefined = undefined;
  dateTo: Date | undefined = undefined;

  ngOnInit () : void {
    this.orderService.refreshNeeded.subscribe({
      next: () => {
        this.getUserOrders();
      },
      error: (err) => {
        console.log(err);
      }
    })
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
    this.orderService.getAll(this.perPage,this.currentPage+1,this.dateFrom,this.dateTo,true).subscribe({
      next:(data)=>{
        this.orders=data.data;
        this.totalItems=data.totalCount;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  pageChanged(event: PageEvent) {
      this.currentPage = event.pageIndex;
      this.perPage = event.pageSize;
      this.loadData();
  }
  
  loadData(){
      this.orders=this.getUserOrders();
   
  }

  filterOrders():void{
    if(this.dateFrom!=null && this.dateTo!=null){
      this.orders=this.getUserOrders();
    }
  }

  clearFilters():void{
    this.dateFrom = undefined;
    this.dateTo = undefined;
    this.getUserOrders();
  }

  reorder(order:any){
    console.log(order);
    this.orderService.reorder(order.orderId).subscribe({
      next:()=>{
        this.snackBar.open("Reorder successful! Expect your order soon.", "Close", {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
      },
      error:()=>{
        this.snackBar.open("An error occurred. Please try again.", "Close", {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    })
  }
}
