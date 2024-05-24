import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PreviousComponent } from './menu/components/previous/previous.component';
import { FavoritesComponent } from './menu/components/favorites/favorites.component';
import { ProductsMenuComponent } from './menu/components/products-menu/products-menu.component';
import { ProductComponent } from './menu/components/product/product.component';

const routes: Routes = [
  {
    path:"",
    component:MenuComponent,
    children : [
      {
        path:"",
        component:ProductsMenuComponent
      },
      {
        path:"previous",
        component:PreviousComponent
      },
      {
        path:"favorites",
        component:FavoritesComponent
      },
      {
        path:"product/:id",
        component:ProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
