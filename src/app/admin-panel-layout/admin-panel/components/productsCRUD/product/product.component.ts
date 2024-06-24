import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/menu/services/products.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor(private fileService: FileService, private dataService:DataService,private productsService : ProductsService,
    @Inject(MAT_DIALOG_DATA) public data:any ,public dialogRef: MatDialogRef<ProductComponent>
  ) {

  }

  @ViewChild('productFile', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('productFileLabel', { static: false }) fileLabel!: ElementRef<HTMLLabelElement>;
  labelVal: string = '';

  categoriesWithNoChildren?: any[];
  currentProduct:any;
  ngOnInit(): void {
    this.dataService.getFlattCategoriesWithNoChildren().subscribe(categories => {
      this.categoriesWithNoChildren = categories;
    });

    this.productsService.getOne(this.data.id).subscribe({
      next:(data)=>{
        console.log(data);
        this.currentProduct=data;
        this.fillForm(data);
        //this.categoryToEdit=data;
      },
      error:(err)=>{
        console.log(err);
      }
      
    });
  }

  ngAfterViewInit() {
    const input = this.fileInput.nativeElement;
    const label = this.fileLabel.nativeElement;

    input.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      let fileName = '';

      if (target.files && target.files.length > 0) {
        fileName = target.files[0].name;
      }

      if (fileName) {
        label.innerHTML = fileName;
      } else {
        label.innerHTML = 'No file chosen';
      }
    });
  }


  selectedFile?: File;
  imageUrl: string = '';

  editProductForm = new FormGroup({
    name: new FormControl("",[Validators.minLength(3),Validators.maxLength(50)]),
    category: new FormControl(""),
    calories: new FormControl("",[Validators.required,Validators.pattern('^[0-9]*$')]),
    price: new FormControl("",[Validators.required,Validators.pattern(/^-?[0-9]*(\.[0-9]+)?$/)]),
    productImage: new FormControl("")
  });

  fillForm(data:any):void{
    this.editProductForm.get("name")?.setValue(data.name);
    this.editProductForm.get("category")?.setValue(data.categoryId);
    this.editProductForm.get("price")?.setValue(data.price);
    this.editProductForm.get("calories")?.setValue(data.calories);
    //this.editProductForm.get("productImage")?.setValue(this.selectedFile);
 }

    

  uploadImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }

    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.fileService.post(formData).subscribe(
        {
          next: (data) => {
            console.log(data);
            // this.imageUrl = `http://localhost:5156/temp/${data.file}`;
            this.imageUrl=data.file;
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
    }
  }

  prepareDataToSend() {
    let formValue = this.editProductForm.value;
    return {
      name:formValue.name,
      categoryId:formValue.category,
      calories:formValue.calories,
      initialPrice:formValue.price,
      imageSrc:this.imageUrl==""?this.currentProduct.imageSrc:this.imageUrl
      
    }
  }

  sendData() : void{
    let dataToSend = this.prepareDataToSend();
    this.productsService.put(this.data.id,dataToSend).subscribe({
      next:(data)=>{
        console.log(data);
        const label = this.fileLabel.nativeElement;
        label.innerHTML = 'No file chosen';
      },
      error:(err)=>{
        console.log(err.error);
      }
    });

    this.dialogRef.close();
  }
}
