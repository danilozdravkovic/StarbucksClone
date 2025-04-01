import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductsComponent } from './admin-panel/components/productsCRUD/products/products.component';
import { ProductCategoriesComponent } from './admin-panel/components/productCategoriesCRUD/product-categories/product-categories.component';
import { OrdersComponent } from './admin-panel/components/orders/orders.component';

const routes: Routes = [
  {
    path:"",
    component:AdminPanelComponent,
    children : [
      {
        path:"",
        component:ProductsComponent
      },
      {
        path:"productCategories",
        component:ProductCategoriesComponent
      },
      {
        path:"orders",
        component:OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelLayoutRoutingModule { }
