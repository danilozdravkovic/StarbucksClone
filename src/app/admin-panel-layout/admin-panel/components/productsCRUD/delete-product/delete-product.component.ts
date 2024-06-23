import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductComponent } from 'src/app/menu/menu/components/product/product.component';
import { ProductsService } from 'src/app/menu/services/products.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,private productsService : ProductsService,
  public dialogRef: MatDialogRef<ProductComponent>) {
  }

  

  delete():void{
    let id=this.data.id;
    this.productsService.delete(id).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this.dialogRef.close();
  }
}
