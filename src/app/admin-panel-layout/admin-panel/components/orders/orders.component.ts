import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrderService } from 'src/app/cart/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService) {
    
  }

  orders:any=[];

  totalItems = 0;
  perPage = 10;
  currentPage = 0;

  dateFrom: Date| undefined = undefined;
  dateTo: Date | undefined = undefined;

  ngOnInit () : void {
    this.orderService.refreshNeeded.subscribe({
      next: () => {
        this.getAllOrders();
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.getAllOrders();
  }

  getAllOrders() : void {
    this.orderService.getAll(this.perPage,this.currentPage+1,this.dateFrom,this.dateTo,false).subscribe({
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
        this.orders=this.getAllOrders();
     
    }

}
