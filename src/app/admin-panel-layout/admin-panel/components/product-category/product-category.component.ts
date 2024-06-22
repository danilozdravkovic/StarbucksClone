import {  Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,private productCategoriesService : ProductCategoriesService,
  public dialogRef: MatDialogRef<ProductCategoryComponent>) {
  }

  flattCategories:any[] = [];
  categoryToEdit : any = "";

  ngOnInit():void {
    this.productCategoriesService.getOne(this.data.id).subscribe({
      next:(data)=>{
        this.fillForm(data);
        this.categoryToEdit=data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
      
    });
  
    this.flattCategories=this.flattenCategories(this.data.categories);
    console.log(this.flattCategories);
  }


  flattenCategories(categories:any):any[]{
    let flatList: any[] = [];
    categories.forEach((category:any) => {
      flatList.push({
        id: category.id,
        name: category.name,
        parentId:category.parentId
      });
  
      if (category.children) {
        flatList = flatList.concat(this.flattenCategories(category.children));
      }
    });
  
    return flatList;
  }

  editProductCategoryForm = new FormGroup({
    name:new FormControl("",Validators.required),
    parent:new FormControl("",Validators.required)
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
