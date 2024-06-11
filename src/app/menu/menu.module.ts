import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { PreviousComponent } from './menu/components/previous/previous.component';
import { FavoritesComponent } from './menu/components/favorites/favorites.component';
import { ProductsMenuComponent } from './menu/components/products-menu/products-menu.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './menu/components/product/product.component';
import { AddInSelectComponent } from './menu/components/product/components/add-in-select/add-in-select.component';



@NgModule({
  declarations: [
    MenuComponent,
    PreviousComponent,
    FavoritesComponent,
    ProductsMenuComponent,
    ProductComponent,
    AddInSelectComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
