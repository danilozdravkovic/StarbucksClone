import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartLineService } from 'src/app/menu/services/cart-line.service';
import { IOrder } from '../interfaces/i-order';
import { OrderService } from '../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(
    private cartLineService:CartLineService,
    private orderService:OrderService,
    private snackBar : MatSnackBar,
    private router : Router
  ) {}

  pickupActiveButton: string = "inStore";
  paymentActiveButton: string = "cash"
  cartItems:any[];
  fullPrice:number;
  order:IOrder={
    address:'',
    totalPrice:0,
    paymentOption:'',
    pickupOption:'',
    cardNumber:''
  };

  cartForm = new FormGroup({
    address:new FormControl(""),
    cardNumber: new FormControl("")
  });

  ngOnInit(): void {
    this.cartLineService.refreshNeeded.subscribe({
      next: () => {
        this.getItemsForCart();
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.getItemsForCart();
  }

  getItemsForCart() {
    this.fullPrice=0;
    this.cartLineService.getAll().subscribe({
      next: (data) => {
        this.cartItems = data.data;
        this.cartItems.forEach(item => {
          this.fullPrice+=item.productPrice;
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setButtonToActive(button:string):void {

    switch(button){
      case 'delivery':{
        this.pickupActiveButton=button;
        this.cartForm.get('address')?.setValidators([Validators.required, Validators.pattern(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\s\d+(?:\/[A-Za-z0-9]+)?$/)]);
        break;
      }
      case 'inStore':{
        this.pickupActiveButton=button;
        this.cartForm.get('address')?.clearValidators();
        break;
      }
      case 'cash':{
        this.paymentActiveButton=button;
        this.cartForm.get('cardNumber')?.clearValidators();
        break;
      }
      case 'card':{
        this.paymentActiveButton=button;
        this.cartForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]);
        break;
      }
    }

    this.cartForm.get('address')?.updateValueAndValidity();
    this.cartForm.get('cardNumber')?.updateValueAndValidity();
  }

  removeItemFromOdred(itemId:number):void{
    this.cartLineService.delete(itemId).subscribe({
      next:(data)=>{
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  addOrder():void{
    this.order.address=this.cartForm.get('address')?.value==""? "In store" : this.cartForm.get('address')?.value;
    this.order.totalPrice=this.fullPrice;
    this.order.pickupOption=this.pickupActiveButton;
    this.order.paymentOption=this.paymentActiveButton;
    this.order.cardNumber=this.cartForm.get('cardNumber')?.value==""? "Cash" : this.cartForm.get('cardNumber')?.value;

    this.orderService.post(this.order).subscribe({
      next:(data)=>{
        this.snackBar.open("Order created", "Close", { 
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        setTimeout(() => {
          this.router.navigate(["main/menu/previous"]);
        }, 2000);
      },
      error:(err)=>{
        if (err.status === 422) {
          let errorMessages = err.error.map((errorItem: any) => `${errorItem.property}: ${errorItem.error}`).join('\n');
          this.snackBar.open(errorMessages, "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        } 
        else if(err.status===401){
          this.snackBar.open("You must be logged in to create order", "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
        else {
          this.snackBar.open("An error occurred. Please try again later.", "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      }
    });
  }

  toggleFavorite(item: any): void {
    item.isFavorite = !item.isFavorite;
    let toggleFavObj = {"productId":item.cartLineId,"tableName":"CartLine"}
    this.cartLineService.toggleProductIsFavourite(toggleFavObj).subscribe({
      next:(data)=>{

      },
      error:(err)=>{

      }
    });
  }
}
