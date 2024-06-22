import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelLayoutRoutingModule } from './admin-panel-layout-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductsComponent } from './admin-panel/components/products/products.component';
import { ProductCategoriesComponent } from './admin-panel/components/product-categories/product-categories.component';
import { ProductCategoryComponent } from './admin-panel/components/product-category/product-category.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductsComponent,
    ProductCategoriesComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminPanelLayoutRoutingModule,
    SharedModule
  ]
})
export class AdminPanelLayoutModule { }
