import { Component } from '@angular/core';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { MatDialog } from '@angular/material/dialog';
import { auto } from '@popperjs/core';
import { DeleteProductCategoryComponent } from '../delete-product-category/delete-product-category.component';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent {
 
  constructor(private productCategoriesService : ProductCategoriesService,
              private dialog : MatDialog)
   {
  }
  categories : any;
 
  ngOnInit() : void {
    this.productCategoriesService.refreshNeeded.subscribe({
      next:()=>{
       this.getAllProductCategories();
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.getAllProductCategories();
  }

  getAllProductCategories(){
    this.productCategoriesService.getAll().subscribe({
      next: (data) => {
        this.categories=data.data;
       
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  edit(id:number):void {
    this.dialog.open(ProductCategoryComponent,{
       width:auto,
       height:auto,
       data:{
        id:id,
        categories:this.categories
       }
    });
  }

  delete(id:number):void{
    this.dialog.open(DeleteProductCategoryComponent,{
      width:auto,
      height:auto,
      data:{
        id:id
      }
    })
  }
}