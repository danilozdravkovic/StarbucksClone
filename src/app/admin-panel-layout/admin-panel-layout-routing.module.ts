import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductsComponent } from './admin-panel/components/products/products.component';
import { ProductCategoriesComponent } from './admin-panel/components/product-categories/product-categories.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelLayoutRoutingModule { }
