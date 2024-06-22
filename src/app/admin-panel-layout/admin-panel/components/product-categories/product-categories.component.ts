import { Component } from '@angular/core';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent {
 
  constructor(private productCategoriesService : ProductCategoriesService,
              )
   {
  }
  categories : any;
 
  ngOnInit() : void {
    this.productCategoriesService.getAll().subscribe({
      next: (data) => {
        this.categories=data.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // edit() {
  //   this.dialog.open(ProductCategoryComponent,{
  //      width:'auto'
  //   }) 
  // }
}
