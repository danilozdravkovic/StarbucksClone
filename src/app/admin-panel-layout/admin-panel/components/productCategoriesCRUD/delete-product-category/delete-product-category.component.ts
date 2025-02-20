import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-delete-product-category',
  templateUrl: './delete-product-category.component.html',
  styleUrls: ['./delete-product-category.component.css']
})
export class DeleteProductCategoryComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,private productCategoriesService : ProductCategoriesService,
  public dialogRef: MatDialogRef<ProductCategoryComponent>) {
  }

  

  delete():void{
    let id=this.data.id;
    this.productCategoriesService.delete(id).subscribe({
      next:(data)=>{
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this.dialogRef.close();
  }
}
