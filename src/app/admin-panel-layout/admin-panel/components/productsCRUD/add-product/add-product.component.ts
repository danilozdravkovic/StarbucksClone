import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/menu/services/products.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private fileService: FileService, private dataService:DataService,private productsService : ProductsService) {

  }
  @ViewChild('file', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileLabel', { static: false }) fileLabel!: ElementRef<HTMLLabelElement>;

  categoriesWithNoChildren?: any[];
  labelVal: string = '';
  ngOnInit(): void {
    this.dataService.getFlattCategoriesWithNoChildren().subscribe(categories => {
      this.categoriesWithNoChildren = categories;
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

  addProductForm = new FormGroup({
    name: new FormControl("",[Validators.minLength(3),Validators.maxLength(50)]),
    category: new FormControl(""),
    calories: new FormControl("",[Validators.required,Validators.pattern('^[0-9]*$')]),
    price: new FormControl("",[Validators.required,Validators.pattern(/^-?[0-9]*(\.[0-9]+)?$/)]),
    productImage: new FormControl("",Validators.required)
  });

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
    let formValue = this.addProductForm.value;
    return {
      name:formValue.name,
      categoryId:formValue.category,
      calories:formValue.calories,
      initialPrice:formValue.price,
      imageSrc:this.imageUrl
    }
  }

  sendData() : void{
    let dataToSend = this.prepareDataToSend();
    this.productsService.post(dataToSend).subscribe({
      next:(data)=>{
        console.log(data);
        this.addProductForm.reset();
      },
      error:(err)=>{
        console.log(err.error);
      }
    });
  }

}

