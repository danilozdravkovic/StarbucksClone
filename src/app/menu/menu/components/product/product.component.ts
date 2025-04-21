import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICartLine } from 'src/app/menu/interfaces/i-cart-line';
import { ProductsService } from 'src/app/menu/services/products.service';
import { CartLineService } from 'src/app/menu/services/cart-line.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  constructor(private productsService:ProductsService,
              private cartLineService:CartLineService,
              private route: ActivatedRoute,
              private router:Router,
              private cdr: ChangeDetectorRef,
              private snackBar : MatSnackBar,
              private fb: FormBuilder) {}
  
  productToDisplay: any = null;
  calories: number = 0;
  caloriesToDisplay : number=0;
  isViewInitialized: boolean = false;
  selectedSizeId:number;
  addInsForm:FormGroup;
  dataToAddToCart:ICartLine = {
    productId:0,
    sizeId:0,
    addIns:[]
  };

  ngOnInit() : void{
    this.addInsForm = this.fb.group({});

    const PRODUCT_ID : number= +this.route.snapshot.paramMap.get('id')!;
    this.productsService.getOne(PRODUCT_ID ).subscribe({
      next:(product)=>{
        if(product){
          this.productToDisplay=product;
          this.caloriesToDisplay=product.calories;
          this.calories=product.calories;

        
          this.initializeFormControls(this.productToDisplay.includedAddIns);
        }
        else{
          this.router.navigate(['**'])
        }
      },
     error:(err)=>{
        console.log(err);
     }
  });

    }
    

  ngAfterViewChecked():void{
    if (this.productToDisplay?.sizes.length > 0 && !this.isViewInitialized) {
          const selectedSize = document.getElementsByClassName("cupSize")[0];
          this.isActive(selectedSize, this.productToDisplay.sizes[0].additionalCalories, this.productToDisplay.sizes);
          this.isViewInitialized = true; 
          this.cdr.detectChanges(); 
      }

      
    }

//function first removes all active links from cupSize divs and then checks on witch div is clicked so it can give it active class
  isActive(div:HTMLDivElement | Element,additionalCalories:number,allSizes: any[]):void{
    let divs =document.getElementsByClassName("cupSize");
    this.selectedSizeId=Number(div.getAttribute('id'));
    let divsArray = Array.from(divs);
    let allSizesNames: string[] = [];
    allSizes.forEach(element => {
      allSizesNames.push(element.name);
    });
    for(let div of divsArray){
      for(let sizeName of allSizesNames){
        let activeSizeName =  sizeName+"-size-active";
        this.removeClassFromClassList(div,activeSizeName);
      }
    }
    for(let sizeName of allSizesNames){
      let activeSizeName =  sizeName+"-size-active";
      let defaultSizeName= sizeName+"-size"
      this.checkIfElementContainsClass(div,defaultSizeName,activeSizeName,additionalCalories);
    }
  }

//function removes class from elements class list
  removeClassFromClassList(element:HTMLDivElement | Element,classToRemove:string):void{
    element.classList.remove(classToRemove);
  }
//function checks if clicked div has expected default class and if does it gives div active class 
  checkIfElementContainsClass(div:HTMLDivElement | Element,classToCheck:string,classToAdd:string,additionalCalories:number):void{
    if(div.classList.contains(classToCheck) ){
      div.classList.add(classToAdd);
      this.caloriesToDisplay=this.calories+additionalCalories;
    }
  }

  initializeFormControls(addIns: any[]): void {
    addIns.forEach(addIn => {
      if(this.hasChildrenForSelect(addIn.children)){
      
        this.addInsForm.addControl(String(addIn.id),new FormControl(this.getSelectedSubchildId(addIn.children)));
      }
      else{
        this.addInsForm.addControl(String(addIn.children[0].id)+'_pump',new FormControl(addIn.children[0].pump));
      }
    });
  }

  getSelectedSubchildId(children: any[]): string | null {
    const selectedSubchild = children?.find(subchild => subchild.selected);
    return selectedSubchild ? selectedSubchild.id : null;
  }

  submitForm(): void {
      this.dataToAddToCart.productId=this.productToDisplay.id;
      this.dataToAddToCart.sizeId=this.selectedSizeId;
      const CART_LINE_ADD_INS = Object.entries(this.addInsForm.value);
      let addInId;
      let addInPump;
      this.dataToAddToCart.addIns=[];
      CART_LINE_ADD_INS.forEach((element:any) => {
        if(element[0].includes('_pump')){
          addInId=parseInt(element[0].split('_pump')[0]);
          addInPump=parseInt(element[1]);
        }
        else{
          addInId=parseInt(element[1]);
          addInPump=null
        }
        this.dataToAddToCart.addIns.push({id:addInId,pump:addInPump})
      });
      
      this.cartLineService.post(this.dataToAddToCart).subscribe({
        next:(data)=>{
          this.snackBar.open("Item added to cart.", "Close", {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
        },
        error:(err)=>{
          if (err.status === 422) {
            let errorMessages = err.error.map((errorItem: any) => `${errorItem.property}: ${errorItem.error}`).join('\n');
            this.snackBar.open(errorMessages, "Close", {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          } 
          else if(err.status===401){
            this.snackBar.open("You must be logged in to add item to cart.", "Close", {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
          else {
            this.snackBar.open("An error occurred. Please try again later.", "Close", {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        }
      })
     
  }

  subchildHasNoPump(addIn: any): boolean {
    return addIn.pump == null;
  }

  hasChildrenForSelect(array: any[]): boolean {
    return array.some(subchild => !subchild.children && this.subchildHasNoPump(subchild));
  }
}
