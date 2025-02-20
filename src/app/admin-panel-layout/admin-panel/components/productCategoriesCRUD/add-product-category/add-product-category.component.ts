import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent {
  flattCategories: any[] = [];

  constructor(private dataService: DataService,private productCategoriesService : ProductCategoriesService) {}

  ngOnInit(): void {
    this.dataService.getFlattProductCategories().subscribe(categories => {
      this.flattCategories = categories;
    });
    this.dataService.subscribeToRefresh();
    this.addProductCategoryForm.get("parent")?.setValue(null);
  }

  addProductCategoryForm = new FormGroup({
    name:new FormControl("",Validators.required),
    parent:new FormControl("")
  });


  prepareDataToSend() : any{
    let formValue = this.addProductCategoryForm.value; 
    return {
      name:formValue.name,
      parentId:formValue.parent=='null'?null:formValue.parent
    } 
  }
  
  sendData() : void{
    let dataToSend = this.prepareDataToSend();
    this.productCategoriesService.post(dataToSend).subscribe({
      next:(data)=>{
        this.addProductCategoryForm.reset();
      },
      error:(err)=>{
        console.log(err);
      }
      
    });
}
}
