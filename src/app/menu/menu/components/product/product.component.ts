import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/menu/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/menu/interfaces/i-product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productsService:ProductsService,
              private route: ActivatedRoute,
              private router:Router,
              private cdr: ChangeDetectorRef) {}
  
  productToDisplay:any;
  calories: number = 0;
  caloriesToDisplay : number=0;

  ngOnInit() : void{
    const productId : number= +this.route.snapshot.paramMap.get('id')!;
    this.productsService.getOne(productId).subscribe(product =>{
      if(product){
        this.productToDisplay=product;
        console.log(this.productToDisplay.sizes.length);
        this.caloriesToDisplay=product.calories;
        this.calories=product.calories;
      }
      else{
        this.router.navigate(['**'])
      }
  });
    }

    ngAfterViewInit(){
      const selectedSize = document.getElementsByClassName("cupSize")[0];
      this.isActive(selectedSize,this.productToDisplay.sizes[0].additionalCalories,this.productToDisplay.sizes);
      this.cdr.detectChanges();
     }

     

//function first removes all active links from cupSize divs and then checks on witch div is clicked so it can give it active class
  isActive(div:HTMLDivElement | Element,additionalCalories:number,allSizes: any[]):void{
    let divs =document.getElementsByClassName("cupSize");
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
}
