import { Component, OnInit } from '@angular/core';
import { IProductCategory, IProductCategoryPrint } from 'src/app/menu/interfaces/i-product-category';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';


@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.css']
})
export class ProductsMenuComponent implements OnInit {
  constructor(private productCategoriesService : ProductCategoriesService){}

  mainCategories : IProductCategoryPrint[]=[];

  ngOnInit():void{
    this.productCategoriesService.getAll().subscribe({
      next:(data)=>{
        this.mapForPrint(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  mapForPrint(data:IProductCategory[]) :void{
    let dataToPrint:IProductCategoryPrint[]=[];
    let mainCategories = data.filter((x:IProductCategory)=>x.parentId==null);
    mainCategories.forEach((element:any) => {
      let childCategories=data.filter((x:IProductCategory)=>x.parentId==element.id);
      element.childCategories=childCategories;
      dataToPrint.push(element);
    });
    console.log(dataToPrint);
    this.mainCategories=dataToPrint;
  }

  filterData(id: string | number) : void{
    console.log(id);
  }
}

   
