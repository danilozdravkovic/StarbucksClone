import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { RouterLink, RouterModule } from '@angular/router';
import { MainLayoutModule } from '../main-layout/main-layout.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RouterLink,
    MainLayoutModule
  ]
})
export class CartModule { }
