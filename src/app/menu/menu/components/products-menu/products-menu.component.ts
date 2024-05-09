import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/menu/interfaces/i-product';
import { IProductCategory, IProductCategoryPrint } from 'src/app/menu/interfaces/i-product-category';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';
import { ProductsService } from 'src/app/menu/services/products.service';


@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.css']
})
export class ProductsMenuComponent implements OnInit {
  constructor(private productCategoriesService : ProductCategoriesService,
              private productsService : ProductsService
  ){}
  originalCategories : IProductCategory[]=[]
  categories : IProductCategoryPrint[]=[];
  categoriesWithProducts : any[]=[];
  categoriesWithProductsToBeFiltered : any[]=[];
  ngOnInit():void{
    this.productCategoriesService.getAll().subscribe({
      next:(data)=>{
        this.filterForPrintCategories(data);
        this.originalCategories=data;
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this.productsService.getAll().subscribe({
      next:(data)=>{
        this.categoriesWithProducts=data;
        this.filterForPrintCategoriesWithProducts(data,this.originalCategories);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  //Method creates array of categories that contains array of child categories
  //so it is easier to print them in ngFor
  filterForPrintCategories(data:IProductCategory[]) :void{
    let dataToPrint:IProductCategoryPrint[]=[];
    let mainCategories = data.filter((x:IProductCategory)=>x.parentId==null);
    mainCategories.forEach((element:any) => {
      let childCategories=data.filter((x:IProductCategory)=>x.parentId==element.id);
      element.childCategories=childCategories;
      dataToPrint.push(element);
    });
    this.categories=dataToPrint;
  }
  //Method creates array of categories that contains array of child categories that contains array of child products
  //so it is easier to print them in ngFor
  filterForPrintCategoriesWithProducts(products:IProduct[],categories:IProductCategory[]){
    let dataToPrint:any[]=[];
    let mainCategories = categories.filter((x:IProductCategory)=>x.parentId==null);
    var subCategories:IProductCategory[]=[];
    mainCategories.forEach((element:any) => {
      let childCategories=categories.filter((x:IProductCategory)=>x.parentId==element.id);
      subCategories=subCategories.concat(childCategories);
    });
    subCategories.forEach((element:any) => {
      let childCategories=categories.filter((x:IProductCategory)=>x.parentId==element.id);
      element.childCategories=childCategories;
      element.childCategories.forEach((element:any) => {
         let childProducts = products.filter((x:any)=>x.categoryId==element.id);
         element.childProducts=childProducts;
      });
      dataToPrint.push(element);
    });
    this.categoriesWithProducts=dataToPrint;
    this.categoriesWithProductsToBeFiltered=dataToPrint;
    console.log(dataToPrint);
  }
  //Method filters categories and their products to show just selected category
  filterData(id: string | number) : void{
    let selectedCategory = this.categoriesWithProductsToBeFiltered.filter((x:any)=>x.id==id);
    console.log(selectedCategory);
    this.categoriesWithProducts=selectedCategory;
  }
}

   
