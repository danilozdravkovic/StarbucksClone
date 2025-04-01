import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelLayoutRoutingModule } from './admin-panel-layout-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductsComponent } from './admin-panel/components/productsCRUD/products/products.component';
import { ProductCategoriesComponent } from './admin-panel/components/productCategoriesCRUD/product-categories/product-categories.component';
import { ProductCategoryComponent } from './admin-panel/components/productCategoriesCRUD/product-category/product-category.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteProductCategoryComponent } from './admin-panel/components/productCategoriesCRUD/delete-product-category/delete-product-category.component';
import { AddProductCategoryComponent } from './admin-panel/components/productCategoriesCRUD/add-product-category/add-product-category.component';
import { AddProductComponent } from './admin-panel/components/productsCRUD/add-product/add-product.component';
import { DeleteProductComponent } from './admin-panel/components/productsCRUD/delete-product/delete-product.component';
import { ProductComponent } from './admin-panel/components/productsCRUD/product/product.component';
import { OrdersComponent } from './admin-panel/components/orders/orders.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductsComponent,
    ProductCategoriesComponent,
    ProductCategoryComponent,
    DeleteProductCategoryComponent,
    AddProductCategoryComponent,
    AddProductComponent,
    DeleteProductComponent,
    ProductComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminPanelLayoutRoutingModule,
    SharedModule
  ]
})
export class AdminPanelLayoutModule { }
