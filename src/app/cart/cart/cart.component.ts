import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  activeButton: string = "inStore";

  cartForm = new FormGroup({
    address:new FormControl("",[Validators.minLength(3),Validators.maxLength(20)]),
    
  });

  setButtonToActive(button:string):void {
    this.activeButton=button;
  }
}
