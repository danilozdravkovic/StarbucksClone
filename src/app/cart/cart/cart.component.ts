import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartLineService } from 'src/app/menu/services/cart-line.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(
    private cartLineService:CartLineService
  ) {}

  activeButton: string = "inStore";
  cartItems:any[];
  fullPrice:number;

  cartForm = new FormGroup({
    address:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    
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
    this.activeButton=button;
  }

  removeItemFromOdred(itemId:number):void{
    this.cartLineService.delete(itemId).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  addOrder():void{
    
  }
}
