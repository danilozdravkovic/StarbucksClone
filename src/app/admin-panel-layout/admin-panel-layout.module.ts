import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelLayoutRoutingModule } from './admin-panel-layout-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductsComponent } from './admin-panel/components/products/products.component';
import { ProductCategoriesComponent } from './admin-panel/components/productCategoriesCRUD/product-categories/product-categories.component';
import { ProductCategoryComponent } from './admin-panel/components/productCategoriesCRUD/product-category/product-category.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteProductCategoryComponent } from './admin-panel/components/productCategoriesCRUD/delete-product-category/delete-product-category.component';
import { AddProductCategoryComponent } from './admin-panel/components/productCategoriesCRUD/add-product-category/add-product-category.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductsComponent,
    ProductCategoriesComponent,
    ProductCategoryComponent,
    DeleteProductCategoryComponent,
    AddProductCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminPanelLayoutRoutingModule,
    SharedModule
  ]
})
export class AdminPanelLayoutModule { }
