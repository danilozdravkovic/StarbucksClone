import {  Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,private productCategoriesService : ProductCategoriesService,
  public dialogRef: MatDialogRef<ProductCategoryComponent>,private dataService: DataService) {
  }

  flattCategories:any[] = [];
  categoryToEdit : any = "";

  ngOnInit():void {
    this.dataService.getFlattProductCategories().subscribe(categories => {
      this.flattCategories = categories;
    });

    this.productCategoriesService.getOne(this.data.id).subscribe({
      next:(data)=>{
        this.fillForm(data);
        this.categoryToEdit=data;
      },
      error:(err)=>{
        console.log(err);
      }
      
    });
  
  }


  editProductCategoryForm = new FormGroup({
    name:new FormControl("",Validators.required),
    parent:new FormControl("")
  });

  fillForm(data:any):void{
     this.editProductCategoryForm.get("name")?.setValue(data.name);
     this.editProductCategoryForm.get("parent")?.setValue(data.parentId);
  }



  prepareDataToSend() : any{
    let formValue = this.editProductCategoryForm.value; 
    return {
      name:formValue.name,
      parentId:formValue.parent=='null'?null:formValue.parent
    } 
  }
  
  sendData() : void{
     let dataToSend = this.prepareDataToSend();
     console.log(dataToSend);
    this.productCategoriesService.put(this.categoryToEdit.id,dataToSend).subscribe({
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
