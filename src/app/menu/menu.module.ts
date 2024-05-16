import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { PreviousComponent } from './menu/components/previous/previous.component';
import { FavoritesComponent } from './menu/components/favorites/favorites.component';
import { ProductsMenuComponent } from './menu/components/products-menu/products-menu.component';
import { MainLayoutModule } from '../main-layout/main-layout.module';


@NgModule({
  declarations: [
    MenuComponent,
    PreviousComponent,
    FavoritesComponent,
    ProductsMenuComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
  ]
})
export class MenuModule { }
